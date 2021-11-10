const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { signinSchema, signupSchema } = require('../validSchema');

exports.signin = async (req, res) => {
  const backUrl = req.header('Referer').split('http://localhost:8080')[1] || '/';
  const { error } = signinSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { id, password } = req.body;
  const user = User.state.find(({ userId }) => userId === id);
  if (!user) return res.status(401).send('아이디 혹은 비밀번호가 잘못됐습니다.');

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return res.status(401).send('아이디 혹은 비밀번호가 잘못됐습니다.');

  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  res.cookie('access_token', token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  });
  res.redirect(backUrl);
};

exports.signup = async (req, res) => {
  const backUrl = req.header('Referer').split('http://localhost:8080')[1] || '/';
  const { error } = signupSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { id, password } = req.body;
  const idExist = User.state.some(({ userId }) => userId === id);
  if (idExist) return res.status(400).send('이미 존재하는 아이디입니다.');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = { userId: id, password: hashedPassword, createdAt: new Date() };
  User.state = newUser;
  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  res.cookie('access_token', token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  });
  res.redirect(backUrl);
};

exports.logout = (req, res) => {
  const backUrl = req.header('Referer').split('http://localhost:8080')[1] || '/';
  res.clearCookie('access_token');
  res.status(204);
  res.redirect(backUrl);
};
