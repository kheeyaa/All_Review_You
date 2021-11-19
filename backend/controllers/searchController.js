const middleware = require('webpack-dev-middleware');
const express = require('express');

const webpack = require('webpack');
const compiler = webpack(require('../../webpack.config'));
const Reviews = require('../models/Review');

const app = express();
app.use(middleware(compiler));

const isExistTag = (tags, keyword) => tags.some(tag => tag.match(keyword));

exports.findSearchResult = (req, res) => {
  const { keyword } = req.query;
  res.send(
    Reviews.state
      .filter(({ title, content, tags }) => title.match(keyword) || content.match(keyword) || isExistTag(tags, keyword))
      .map(({ content, photos }, i, reviews) => ({
        ...reviews[i],
        content: content.slice(0, 300),
        photos: photos.slice(0, 1),
      }))
  );
};
