const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Review = require('../../models/Review');

const sanitizeHtml = require('sanitize-html');

const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
};

// @route   POST api/reviews/
// @desc    리뷰 작성
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('title', '리뷰 제목은 2~30글자 까지입니다')
        .not()
        .isEmpty()
        .isLength({
          min: 2,
          max: 30,
        }),
      check('description', '리뷰 내용은 최소 두글자, 최대 이백글자 입니다')
        .not()
        .isEmpty()
        .isLength({
          min: 2,
          max: 200,
        }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, productId } = req.body;

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(productId);

      const newReview = {
        title: title,
        description: sanitizeHtml(description, sanitizeOption),
        images: post.images[0],
        productId: productId,
        user: user,
      };

      // const review = new Review(newReview);

      // review.posts.unshift(post._id);
      post.reviews.unshift(newReview);

      // await review.save();
      await post.save();

      res.json(post.reviews);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/reviews
// @desc    모든 리뷰 가져 오기
// @access  Public
router.get('/', async (req, res) => {
  let reviews = [];
  try {
    const reviews = await Review.find().populate('user', 'nickname').sort({
      date: -1,
    });

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ msg: '등록된 리뷰 없음' });
    }

    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/reviews/:id
// @desc    ID로 해당 리뷰 받기
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.find({ 'reviews._id': req.params.id }).populate(
      'reviews.user',
      'nickname'
    );

    if (!post) {
      return res.status(404).json({ msg: '리뷰를 찾을 수 없습니다' });
    }

    res.json(post[0].reviews);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '게시글을 찾을 수 없습니다' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/reviews/:id
// @desc    해당 리뷰 지우기
// @access  Private
router.delete('/delete', auth, async (req, res) => {
  let owner = '';

  try {
    // 해당 리뷰가 담겨있는 게시물을 불러온다.
    const post = await Post.find({ 'reviews._id': req.query.id }).populate(
      'reviews.user',
      'nickname'
    );

    if (!post) {
      return res.status(404).json({ msg: '해당 리뷰가 없습니다.' });
    }

    post[0].reviews.map((review) => (owner = review.user._id.toString()));

    // 리뷰를 작성한 유저인지 확인한다.
    if (owner !== req.user.id) {
      return res.status(401).json({ msg: '리뷰를 작성한 유저가 아닙니다.' });
    }
    // console.log(post[0].reviews[0]);
    // console.log(post[0].reviews);

    // Get remove index
    // 리뷰 삭제
    const removeIndex = post[0].reviews
      .map((review) => review._id)
      .indexOf(req.query.id);

    post[0].reviews.splice(removeIndex, 1);

    await post[0].save();

    res.json({ msg: '리뷰 삭제 완료' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '리뷰를 찾을 수 없습니다.' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
