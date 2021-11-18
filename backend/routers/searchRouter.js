const { Router } = require('express');

const { findSearchResult } = require('../controllers/searchController');
const { sendHtml } = require('../controllers/sendHtml');

const searchRouter = Router();

searchRouter.get('/', (req, res) => {
  req.headers.accept.match(/text\/html/) ? sendHtml('search', res) : findSearchResult(req, res);
});

// searchRouter.post('/:id', (req, res) => {});
// searchRouter.put('/:id', (req, res) => {});
// searchRouter.delete('/:id', (req, res) => {});

module.exports = searchRouter;
