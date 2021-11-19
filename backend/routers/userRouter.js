const { Router } = require('express');
const { getMe } = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/me', getMe);

module.exports = userRouter;
