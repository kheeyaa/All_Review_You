const { Router } = require('express');

const reviewRouter = Router();

const Reviews = require('../models/Review');

reviewRouter.get('/', (req, res) => {});
reviewRouter.get('/:id', (req, res) => {
  res.send(Reviews.state.filter(({ userId }) => userId === +req.params.id));
});
reviewRouter.post('/', (req, res) => {});
reviewRouter.patch('/:id', (req, res) => {});
reviewRouter.put('/:id', (req, res) => {});
reviewRouter.delete('/:id', (req, res) => {});

module.exports = reviewRouter;
