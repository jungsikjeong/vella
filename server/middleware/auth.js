const jwt = require('jsonwebtoken');
// const config = require('config');

module.exports = function (req, res, next) {
  // 헤더에서 토큰 가져 오기
  const token = req.header('x-auth-token');
  // console.log('토큰 확인중...');
  // console.log('토큰 ?', token);
  // 토큰 확인
  if (!token) {
    return res.status(401).json({ msg: '로그인이 필요합니다.' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

    // console.log('decoded:', decoded);
    req.user = decoded.user;
    // console.log('req.user::', req.user);
    // console.log('토큰 확인완료 토큰 있음', req.user);
    next();
  } catch (err) {
    res.status(401).json({ msg: ' Token is not valid' });
  }
};
