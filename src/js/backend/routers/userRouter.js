const { Router } = require('express');
const { getMe } = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/me', getMe);
userRouter.get('/:id', (req, res) => {});
userRouter.post('/', (req, res) => {});

module.exports = userRouter;
