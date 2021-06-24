const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');
const sanitizeHtml = require('sanitize-html');

// const upload = require('../../middleware/upload');

const { ObjectId } = mongoose.Types;

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

const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single('file');

router.post('/upload', (req, res) => {
  // 갖고온 이미지 저장을 해주면 된다.
  upload(req, res, (err) => {
    if (err) {
      return req.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

// @route   POST api/posts/upload
// @desc    게시물 이미지 업로드
// @access  Private
// router.post('/upload', async (req, res) => {
//   // 프론트 에서 가져온 이미지를 저장을 해준다.
//   upload.imageUpload(req, res, (err) => {
//     if (err) {
//       return res.json({ success: false, err });
//     }
//     if (!req.file) return res.send('Please upload a file');

//     return res.json({
//       success: true,
//       filePath: res.req.file.location,
//       fileName: res.req.file.originalname,
//     });
//   });
// });

// @route   POST api/posts
// @desc    게시물 작성
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('title', '상품 이름은 2~30글자 까지입니다')
        .not()
        .isEmpty()
        .isLength({
          min: 2,
          max: 30,
        }),
      check('description', '상품 설명은 최소 두글자, 최대 이백글자 입니다')
        .not()
        .isEmpty()
        .isLength({
          min: 2,
          max: 200,
        }),
      check('price', '상품 가격을 확인해주세요').not(),
      check('images', '상품 이미지를 업로드해주세요').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, price, images, categories } = req.body;

    try {
      const newPost = new Post({
        title: title,
        description: sanitizeHtml(description, sanitizeOption),
        price: price,
        images: images,
        categories: categories,
        user: req.user.id,
      });
      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// html을 없애고 내용이 너무 길면 200자로 제한하는 함수
const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });

  return filtered.length < 20 ? filtered : `${filtered.slice(0, 20)}...`;
};

// @route   PATCH api/patch
// @desc    게시물 편집
// @access  Private
router.patch(
  '/:id',
  [
    auth,
    [
      check('title', '상품 이름은 2~30글자 까지입니다')
        .not()
        .isEmpty()
        .isLength({
          min: 2,
          max: 30,
        }),
      check('description', '상품 설명은 최소 두글자, 최대 이백글자 입니다')
        .not()
        .isEmpty()
        .isLength({
          min: 2,
          max: 200,
        }),
      check('price', '상품 가격을 확인해주세요').not(),
      check('images', '상품 이미지를 업로드해주세요').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, price, images, categories } = req.body;
    const { id } = req.params;
    try {
      // 상품 편집
      const newData = { ...req.body };
      // body 값이 주어졌으면 HTML 필터링
      if (nextData.description) {
        nextData.description = sanitizeHtml(nextData.description);
      }
      const newPost = await Post.findOneAndUpdate({ _id: id }, newData, {
        new: true,
      }).exec();

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/posts
// @desc    모든 게시물 가져 오기 혹은 카테고리에 맞는 게시물 가져오기
// @access  Public
router.post('/products', async (req, res) => {
  let categoryNumber = req.body.categoryNumber
    ? parseInt(req.body.categoryNumber)
    : '';
  let posts;
  let findArgs = {};
  let term = req.body.searchTerm;

  try {
    if (term) {
      const findPost = await Post.find().find({ $text: { $search: term } });

      return res.status(200).json(findPost);
    }

    if (categoryNumber) {
      findArgs['categories'] = categoryNumber;

      posts = await Post.find(findArgs).sort({
        date: -1,
      });

      const newPost = posts.map((post) => ({
        price: post.price,
        images: post.images,
        categories: post.categories,
        sold: post.sold,
        reviews: post.reviews,
        _id: post._id,
        title: post.title,
        description: removeHtmlAndShorten(post.description),
        user: post.user,
        date: post.date,
        __v: post.__v,
      }));

      res.json(newPost);
      return;
    } else {
      posts = await Post.find().sort({
        date: -1,
      });

      const newPost = posts.map((post) => ({
        price: post.price,
        images: post.images,
        categories: post.categories,
        sold: post.sold,
        reviews: post.reviews,
        _id: post._id,
        title: post.title,
        description: removeHtmlAndShorten(post.description),
        user: post.user,
        date: post.date,
        __v: post.__v,
      }));

      res.json(newPost);
    }
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/:id
// @desc    ID로 게시물 받기(특정 게시글 받기)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      'reviews.user',
      'nickname'
    );
    console.log(post);
    if (!post) {
      return res.status(404).json({ msg: '게시글을 찾을 수 없습니다' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '게시글을 찾을 수 없습니다' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts/:id
// @desc    게시글 지우기
// @access  Private
router.delete('/delete', auth, async (req, res) => {
  try {
    // id =123123,123123,123123 이거를
    // productIds =['123123','123123','123123'] 이런식으로 바꿔주기
    let productIds = req.query.id;
    let ids = req.query.id.split(',');
    let postUser;

    productIds = ids.map((item) => {
      return item;
    });

    const post = await Post.find({ _id: { $in: productIds } });
    const user = await User.findById(req.user.id).select('-password');

    if (!post) {
      return res.status(404).json({ msg: '게시글이 없습니다.' });
    }

    // post.user.toString()이 배열로 나와서, 객체로 바꿔줌
    post.map((product) => (postUser = product.user.toString()));

    // check user
    if (postUser !== req.user.id) {
      return res.status(401).json({ msg: '게시글을 작성한 유저가 아닙니다.' });
    }

    await Post.deleteMany({ _id: post });

    // // aws s3 버킷에서 파일 삭제
    // const url = post.image.split('/'); // post에 저장된 image를 가져옴
    // const delFileName = url[url.length - 1];
    // const params = {
    //   Bucket: 'gongcha',
    //   Key: `uploadImage/${delFileName}`,
    // };
    // upload.s3.deleteObject(params, function (err, data) {
    //   console.log(params);
    //   if (err) {
    //     console.log('aws image delete error');
    //     console.log(err, err.stack);
    //     return;
    //   } else {
    //     console.log('aws image delete success' + data);
    //   }
    // });

    res.json({ msg: '게시글 삭제 완료' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '게시글을 찾을 수 없습니다.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/like/:id
// @desc    게시글 좋아요 누르기
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // 게시글이 이미 좋아요 눌렀는지 확인
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: '이미 좋아요를 누른 게시글 입니다.' });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '게시글을 찾을 수 없습니다.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/like/:id
// @desc    게시글 좋아요 취소하기
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // 게시물에 좋아요를 눌렀는지 확인
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ msg: '게시글에 좋아요를 먼저 눌러주세요.' });
    }

    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '게시글을 찾을 수 없습니다.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/posts/comment/:id
// @desc    게시글에 댓글 작성
// @access  Private
router.post(
  '/comment/:id',
  [auth, [check('text', '댓글을 입력해주세요').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');

      const post = await Post.findById(req.params.id).populate(
        'comments.user',
        ['name', 'avatar']
      );

      const newComment = {
        text: req.body.text,
        user: user,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    댓글 삭제
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = await post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // 댓글이 있는지 확인
    if (!comment) {
      // return res.status(404).json({ msg: '댓글이 없습니다.' });
      return console.log('댓글이 없습니다');
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: '유저가 일치하지 않습니다.' });
    }

    // Get remove index
    // 댓글 삭제
    const removeIndex = post.comments
      .map((comment) => comment.id)
      .indexOf(req.params.comment_id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/comment/like/:id/:comment_id
// @desc    댓글 좋아요 누르기
// @access  Private
router.put('/comment/like/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = await post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // 댓글이 이미 좋아요 눌렀는지 확인
    if (
      comment.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: '이미 좋아요를 누른 댓글입니다.' });
    }

    comment.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(comment.likes);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '댓글을 찾을 수 없습니다.' });
      // return console.log('댓글없엉');
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/comment/unlike/:id/:comment_id
// @desc    댓글 좋아요 취소하기
// @access  Private
router.put('/comment/unlike/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = await post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // 게시물에 좋아요를 눌렀는지 확인
    if (
      comment.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: '댓글에 좋아요를 먼저 눌러주세요' });
    }

    //Get remove index
    const removeIndex = comment.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    comment.likes.splice(removeIndex, 1);

    await post.save();

    res.json(comment.likes);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '댓글을 찾을 수 없습니다.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/posts/comment/step/:id/:comment_id
// @desc    게시글에 대댓글 작성
// @access  Private
router.post(
  '/comment/step/:id/:comment_id',
  [auth, [check('text', '댓글을 입력해주세요').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');

      const post = await Post.findById(req.params.id)
        .populate('comments.user', ['name', 'avatar'])
        .populate('comments.commentsStep.user', ['name', 'avatar']);

      const comment = await post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );

      const newComment = {
        text: req.body.text,
        user: user,
      };

      comment.commentsStep.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/posts/comment/step/:id/:comment_id
// @desc    대댓글 삭제
// @access  Private
router.delete('/comment/step/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('comments.user', ['name', 'avatar'])
      .populate('comments.commentsStep.user', ['name', 'avatar']);

    const commentStep = post.comments.map((comment) =>
      comment.commentsStep.find(
        (commentStep) => commentStep.id === req.params.comment_id
      )
    );

    // 댓글이 있는지 확인
    if (!commentStep) {
      // return res.status(404).json({ msg: '댓글이 없습니다.' });
      return console.log('댓글이 없습니다');
    }

    if (commentStep) {
      // Get remove index
      // 댓글 삭제
      const removeIndex = post.comments.map((comment) =>
        comment.commentsStep
          .map((commentStep) => commentStep.id)
          .indexOf(req.params.comment_id)
      );

      post.comments.map((comment) =>
        comment.commentsStep.splice(removeIndex, 1)
      );

      await post.save();

      return res.json(post.comments);
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: '유저가 일치하지 않습니다.' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/comment/step/like/:id/:comment_id
// @desc    대댓글 좋아요 누르기
// @access  Private
router.put('/comment/step/like/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const commentStep = post.comments.map((comment) =>
      comment.commentsStep.find(
        (commentStep) => commentStep.id === req.params.comment_id
      )
    );
    // console.log(commentStep);
    const reply = commentStep.find((step) => step.id === req.params.comment_id);

    // 댓글이 이미 좋아요 눌렀는지 확인
    if (
      reply.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: '이미 좋아요를 누른 댓글입니다.' });
    }

    reply.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(reply.likes);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '댓글을 찾을 수 없습니다.' });
      // return console.log('댓글없엉');
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/comment/step/unlike/:id/:comment_id
// @desc    대댓글 좋아요 취소하기
// @access  Private
router.put('/comment/step/unlike/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const commentStep = post.comments.map((comment) =>
      comment.commentsStep.find(
        (commentStep) => commentStep.id === req.params.comment_id
      )
    );
    const reply = commentStep.find((step) => step.id === req.params.comment_id);

    // 게시물에 좋아요를 눌렀는지 확인
    if (
      reply.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: '댓글에 좋아요를 먼저 눌러주세요' });
    }

    //Get remove index
    const removeIndex = reply.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    reply.likes.splice(removeIndex, 1);

    await post.save();

    res.json(reply.likes);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '댓글을 찾을 수 없습니다.' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
