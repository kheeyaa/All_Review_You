const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signin = async (req, res) => {
  const { id, password } = req.body;
  const user = User.state.find(({ userId }) => userId === id);
  if (!user) return res.status(401).send('fail');

  try {
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).send('fail');
    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.cookie('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    res.send('ok');
  } catch (e) {
    console.error(e.message);
    res.status(500).send(e.message);
  }
};

exports.signup = async (req, res) => {
  const { id, password } = req.body;
  const idExist = User.state.some(({ userId }) => userId === id);
  if (idExist) return res.status(400);
  try {
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
    res.send('ok');
  } catch (e) {
    console.error(e.message);
    res.status(500).send(e.message);
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie('access_token');
    res.send('ok');
  } catch (e) {
    res.status(500).send(e.message);
  }
};
