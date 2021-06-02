const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route   GET api/auth
// @desc    user by token
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // req.user.id는 auth(미들웨어)의 req.user에서 가져오는것임
    // findOne이나 find대신에 findById를 왜 쓰냐면 auth 미들웨어에서 오는 req.user에 담겨있는게 id여서다.
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth (로그인)
// @desc    사용자 인증 및 토큰 받기
// @access  Public
router.post(
  '/',
  [
    check('email', '유효한 이메일을 입력해주세요').isEmail(),
    check('password', '비밀번호를 입력해주세요').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // 사용자가 있는지 확인
      let user = await User.findOne({ email });

      if (!user) {
        res.status(400).json({ errors: [{ msg: '등록된 email이 없습니다.' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res
          .status(400)
          .json({ errors: [{ msg: '비밀번호가 일치하지 않습니다.' }] });
      }

      await user.save();

      // Return jsonwebtoken
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
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
