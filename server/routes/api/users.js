const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Post = require('../../models/Post');
const auth = require('../../middleware/auth');
const upload = require('../../middleware/upload');

// @route   POST api/users (회원가입)
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('nickname', '닉네임을 확인해주세요(최대 5글자)')
      .not()
      .isEmpty()
      .isLength({
        max: 5,
      }),
    check('email', '유효한 이메일을 입력해주세요').isEmail(),
    check('password', '6자 이상의 비밀번호를 입력해주세요').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nickname, email, password } = req.body;

    try {
      // 사용자가 있는지 확인
      let user = await User.findOne({ email });
      let userNickname = await User.findOne({ nickname });

      if (user) {
        res
          .status(400)
          .json({ errors: [{ msg: '이미 등록된 이메일입니다.' }] });
      }

      if (userNickname) {
        res
          .status(400)
          .json({ errors: [{ msg: '이미 등록된 닉네임입니다.' }] });
      }

      user = new User({
        nickname,
        email,
        password,
      });

      // 비밀번호 암호화
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken
      // 원래는 로그인에쓰이지만, 회원가입하자마자 바로 로그인 할 수 있게하려고 회원가입에쓰임
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
          console.log('token:', token);
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/users/cart
// @desc    카트에 담기
// @access  Private
router.post('/addToCart', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.body.productId);

    if (!post) {
      return res.status(400).json({ msg: '게시글이 존재하지 않습니다.' });
    }

    // 카트 유무
    let isCart = false;

    if (user.cart.length > 0) {
      user.cart.forEach((item) => {
        if (item.id === req.body.productId) {
          isCart = true;
        }
      });
    }
    // 상품이 이미 있을때
    // 'cart.$.quantity': Cart라는 Array안의
    // quantity 중에서 업데이트할 요소를 식별해줌
    if (isCart) {
      User.findOneAndUpdate(
        { _id: user._id, 'cart.id': req.body.productId },
        {
          $inc: { 'cart.$.quantity': 1 },
        },
        { new: true }
      ).exec();
      console.log(user.cart);
      return res.status(200).json(user.cart);
    } else {
      // 상품이 이미 있지 않을때
      User.findOneAndUpdate(
        { _id: user._id },
        {
          $push: {
            cart: {
              id: req.body.productId,
              price: post.price,
              images: post.images,
              title: post.title,
              description: post.description,
              quantity: 1,
              Date: Date.now(),
            },
          },
        },
        { new: true }
      ).exec();
      console.log(user.cart);
      return res.status(200).json(user.cart);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/users/edit/ (유저 정보 변경)
// @desc    User information change
// @access  Private
router.post('/edit/profile', auth, async (req, res) => {
  const { name, avatar } = req.body;

  try {
    let user = await User.findOne({ _id: req.user.id }).select('-password');

    if (user) {
      // Update
      const newUser = await User.findByIdAndUpdate(
        user,
        {
          $set: {
            name: name ? name : user.name,
            avatar: avatar ? avatar : user.avatar,
          },
        },
        { new: true }
      )
        .select('-password')
        .exec();

      return res.json(newUser);

      // const post = await Post.findByIdAndUpdate(
      //   user,
      //   {
      //     $set: {
      //       user: req.user.id,
      //     },
      //   },
      //   { multi: true, new: true }
      // ).exec();
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/posts/cart
// @desc    해당 유저의 장바구니에 담긴 상품들 가져오기
// @access  Private
router.get('/getCart', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(400).json({ msg: '로그인을 해주세요.' });
    }

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ msg: '장바구니에 담긴 상품이 없습니다.' });
    }
    if (user.cart && user.cart.length > 0) {
      res.json(user.cart);
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '게시글을 찾을 수 없습니다' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/users/profile/:user_id
// @desc    사용자 ID로 프로필 가져 오기
// @access  Public
router.get('/profile/:user_id', async (req, res) => {
  try {
    const profile = await User.findById(req.params.user_id)
      .select('-password')
      .populate('posts', ['image', 'text']);

    if (!profile)
      return res.status(400).json({ msg: '프로필을 찾을 수 없습니다.' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    // 경로로오는 user_id가 + - 면 발생하는 에러를 잡아줌
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: '프로필을 찾을 수 없습니다.' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
