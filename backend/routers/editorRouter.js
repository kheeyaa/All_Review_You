const { Router } = require('express');

const { sendHtml } = require('../controllers/sendHtml');

const editorRouter = Router();

editorRouter.get('/', (req, res) => {
  res.format({
    'text/html': () => {
      sendHtml('editor', res);
    },
    'application/json': () => {},
    default: () => {
      res.status(406).send('Not Acceptable');
    },
  });
});

module.exports = editorRouter;
