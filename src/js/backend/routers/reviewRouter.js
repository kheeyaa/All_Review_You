const { Router } = require('express');
const express = require('express');
const middleware = require('webpack-dev-middleware');
const { createReview, writeReview, getOneReview } = require('../controllers/reviewController');

const reviewRouter = Router();

const path = require('path');
const webpack = require('webpack');
const Reviews = require('../models/Review');
const compiler = webpack(require('../../../../webpack.config'));

const app = express();
app.use(middleware(compiler));

reviewRouter.get('/', (req, res) => {});

// reviews/likes
reviewRouter.patch('/review/likes', (req, res) => {
  const { curUserId, curReviewId } = req.body;

  const review = Reviews.state.filter(({ reviewId }) => reviewId === +curReviewId)[0];

  const { likes } = review;
  const isLiked = review.likes.includes(curUserId);

  // 기존의 review 데이터를 업데이트 해주어야함.
  if (isLiked) {
    Reviews.change(+curReviewId, { ...review, likes: likes.filter(like => like !== curUserId) });
  } else {
    Reviews.change(+curReviewId, { ...review, likes: [...likes, curUserId] });
  }

  res.send(!isLiked);
});

// reviews/mine/ -> GET 내가 쓴 리뷰
reviewRouter.get('/mine/:id', (req, res) => {
  res.send(
    Reviews.state
      .filter(({ userId }) => userId === req.params.id)
      .map(({ content, photos }, i, reviews) => ({
        ...reviews[i],
        content: content.slice(0, 300),
        photos: photos.slice(0, 1),
      }))
  );
});

// reviews/id -> GET 특정 리뷰 for reviewDetail Page
reviewRouter.get('/:id([0-9]+)', (req, res) => {
  res.format({
    // 새로고침에 의한 브라우저 요청에 대해 html을 응답
    'text/html': () => {
      // 웹팩이 처리한 html 경로를 찾는다.
      const filename = path.join(compiler.outputPath, 'index.html');
      // 그 경로에에서 html 파일을 읽는다.
      compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) return;
        res.set('content-type', 'text/html').end(result);
      });
    },
    // ajax 요청에 대해 json을 응답
    'application/json': () => {
      res.send(Reviews.state.filter(({ reviewId }) => reviewId === +req.params.id));
    },
    default: () => {
      // log the request and respond with 406
      res.status(406).send('Not Acceptable');
    },
  });
});

// reviews/all => 모든 리뷰 보내줌
reviewRouter.get('/all', (req, res) => {
  res.send(Reviews.state);
});

reviewRouter.post('/', writeReview);
reviewRouter.patch('/:id', (req, res) => {});
reviewRouter.put('/:id', (req, res) => {});
reviewRouter.delete('/:id', (req, res) => {});

module.exports = reviewRouter;
