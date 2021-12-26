const { Router } = require('express');

const { sendHtml } = require('../controllers/sendHtml');

const searchRouter = Router();

searchRouter.get('/', (req, res) => {
  res.format({
    'text/html': () => {
      sendHtml('search', res);
    },
    default: () => {
      res.status(406).send('Not Acceptable');
    },
  });
});

module.exports = searchRouter;
