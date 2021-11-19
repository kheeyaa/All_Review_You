const { Router } = require('express');

const { sendReivew, rewriteReview } = require('../controllers/reEditorController');

const { sendHtml } = require('../controllers/sendHtml');

const reEditorRouter = Router();

reEditorRouter.get('/:id([0-9]+)', (req, res) => {
  req.headers.accept.match(/text\/html/) ? sendHtml('re-editor', res) : sendReivew(req, res);
});

reEditorRouter.post('/:id([0-9]+)', rewriteReview);

module.exports = reEditorRouter;
