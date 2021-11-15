const { Router } = require('express');
const { findSearchResult } = require('../controllers/searchController');

const searchRouter = Router();

searchRouter.get('/', findSearchResult);

// searchRouter.post('/:id', (req, res) => {});
// searchRouter.put('/:id', (req, res) => {});
// searchRouter.delete('/:id', (req, res) => {});

module.exports = searchRouter;
