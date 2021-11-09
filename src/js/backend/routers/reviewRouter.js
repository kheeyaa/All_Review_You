const { Router } = require('express');

const reviewRouter = Router();

reviewRouter.get('/', (req, res) => {});
reviewRouter.get('/:id', (req, res) => {});
reviewRouter.post('/', (req, res) => {});
reviewRouter.patch('/:id', (req, res) => {});
reviewRouter.put('/:id', (req, res) => {});
reviewRouter.delete('/:id', (req, res) => {});

module.exports = reviewRouter;
