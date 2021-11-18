const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

exports.checkLoggedIn = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    res.status(401).redirect('/');
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (e) {
    console.error(e.message);
  }
};

exports.jwtMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (e) {
    console.error(e.message);
    next();
  }
};

exports.upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'src/images');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 },
});
