const { Router } = require('express');
const { signin, signup, logout } = require('../controllers/authController');

const authRouter = Router();

authRouter.post('/signin', signin);
authRouter.post('/signup', signup);
authRouter.post('/logout', logout);

module.exports = authRouter;
