const { Router } = require('express');

const { findSearchResult } = require('../controllers/searchController');
const { sendHtml } = require('../controllers/sendHtml');

const searchRouter = Router();

searchRouter.get('/', (req, res) => {
  res.format({
    'text/html': () => {
      sendHtml('search', res);
    },
    'application/json': () => {
      findSearchResult(req, res);
    },
    default: () => {
      res.status(406).send('Not Acceptable');
    },
  });
});

// searchRouter.post('/:id', (req, res) => {});
// searchRouter.put('/:id', (req, res) => {});
// searchRouter.delete('/:id', (req, res) => {});

module.exports = searchRouter;
