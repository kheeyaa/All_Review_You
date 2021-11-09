const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('접근할 수 없습니다.');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = auth;
