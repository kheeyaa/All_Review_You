// const { reverse } = require('core-js/core/array');
const { Router } = require('express');

const searchRouter = Router();

const Reviews = require('../models/Review');

const isExistTag = (tags, keyword) => tags.every(tag => tag.match(keyword));

searchRouter.get('/:keyword', (req, res) => {
  const { keyword } = req.params;
  res.send(
    Reviews.state
      .filter(({ title, content, tags }) => title.match(keyword) || content.match(keyword) || isExistTag(tags, keyword))
      .map(({ content, photos }, i, reviews) => ({
        ...reviews[i],
        content: content.slice(0, 100),
        photos: photos.slice(0, 1),
      }))
  );
});
// searchRouter.post('/:id', (req, res) => {});
// searchRouter.put('/:id', (req, res) => {});
// searchRouter.delete('/:id', (req, res) => {});

module.exports = searchRouter;
