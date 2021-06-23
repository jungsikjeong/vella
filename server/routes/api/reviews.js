const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Review = require('../../models/Review');
const User = require('../../models/User');

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

    const { title, description } = req.body;

    try {
      const newReview = new Review({
        title: title,
        description: sanitizeHtml(description, sanitizeOption),
        user: req.user.id,
      });
      const review = await newReview.save();

      res.json(review);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
