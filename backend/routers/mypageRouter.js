const { Router } = require('express');

const { sendHtml } = require('../controllers/sendHtml');

const mypageRouter = Router();

mypageRouter.get('/', (req, res) => {
  sendHtml('mypage', res);
});

module.exports = mypageRouter;
