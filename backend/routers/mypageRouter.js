const { Router } = require('express');

const { sendHtml } = require('../controllers/sendHtml');
const { checkLoggedIn } = require('../middleware');

const mypageRouter = Router();

mypageRouter.get('/', checkLoggedIn, (req, res) => {
  sendHtml('mypage', res);
});

module.exports = mypageRouter;
