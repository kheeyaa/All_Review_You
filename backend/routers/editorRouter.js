const { Router } = require('express');

const { sendHtml } = require('../controllers/sendHtml');
const { checkLoggedIn } = require('../middleware');

const editorRouter = Router();

editorRouter.get('/', checkLoggedIn, (req, res) => sendHtml('editor', res));

module.exports = editorRouter;
