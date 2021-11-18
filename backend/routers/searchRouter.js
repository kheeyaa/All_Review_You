const { Router } = require('express');

const { findSearchResult } = require('../controllers/searchController');
const { sendHtml } = require('../controllers/sendHtml');

const searchRouter = Router();

searchRouter.get('/', (req, res) => {
  res.format({
    'text/html': () => {
      sendHtml('search', res);
    },
    // ajax 요청에 대해 json을 응답
    'application/json': findSearchResult,
    default: () => {
      // log the request and respond with 406
      res.status(406).send('Not Acceptable');
    },
  });
});

// searchRouter.post('/:id', (req, res) => {});
// searchRouter.put('/:id', (req, res) => {});
// searchRouter.delete('/:id', (req, res) => {});

module.exports = searchRouter;
