const jwt = require('jsonwebtoken');
// const config = require('config');

module.exports = function (req, res, next) {
  // 헤더에서 토큰 가져 오기
  const token = req.header('x-auth-token');

  // 토큰 확인
  if (!token) {
    return res.status(401).json({ msg: '토큰 없음, 승인 거부 됨' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

    // console.log('decoded:', decoded);
    req.user = decoded.user;
    // console.log('req.user::', req.user);

    next();
  } catch (err) {
    res.status(401).json({ msg: ' Token is not valid' });
  }
};
