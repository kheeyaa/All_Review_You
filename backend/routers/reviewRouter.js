const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const middleware = require('webpack-dev-middleware');

const webpack = require('webpack');
const path = require('path');
const compiler = webpack(require('../../webpack.config'));

const { createReview, writeReview, getOneReview, uploadPicture } = require('../controllers/reviewController');
const { sendHtml } = require('../controllers/sendHtml');

const reviewRouter = express.Router();

const Reviews = require('../models/Review');

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
    'text/html': () => {
      sendHtml('reviewDetail', res);
    },
    // ajax 요청에 대해 json을 응답
    'application/json': () => {
      const targetReview = Reviews.state.filter(({ reviewId }) => reviewId === +req.params.id)[0];
      const relatedReview = Reviews.state.filter(
        ({ reviewId, tags }) => reviewId !== targetReview.reviewId && targetReview.tags.some(tag => tags.includes(tag))
      );
      res.send([targetReview, relatedReview]);
    },
    default: () => {
      // log the request and respond with 406
      res.status(406).send('Not Acceptable');
    },
  });
});

// reviews/review/id -> 댓글 생성
reviewRouter.post('/:id', (req, res) => {
  const { params } = req.body;
  const { inUserId, inContent, inReviewId } = params;
  const [...state] = Reviews.state;

  if (inContent.trim().length > 0) {
    state.forEach(({ reviewId, comments }, i) => {
      const generateId = () => Math.max(...comments.map(cur => cur.commentId)) + 1;
      if (+inReviewId === reviewId) {
        state[i].comments = [...state[i].comments, { commentId: generateId(), userId: inUserId, content: inContent }];
      }
    });
    res.send(Reviews.state.filter(({ reviewId }) => reviewId === +req.params.id));
  }
});

// ----- For Intersection Observer

const reviewOffset = (() => {
  const unit = 12;
  let offset = 0;
  return {
    current() {
      return offset;
    },
    next() {
      offset += unit;
      return offset;
    },
    reset() {
      offset = 0;
    },
  };
})();

// reviews/resetOffset
reviewRouter.patch('/offset', (req, res) => {
  reviewOffset.reset();
  res.send();
});

// reviews/order-likes => 모든 리뷰 좋아요순으로 보내줌
reviewRouter.get('/order-likes', (req, res) => {
  // if (reviewOffset.current() >= Reviews.length) return;
  res.send(
    Reviews.state
      .sort((review1, review2) => review2.likes.length - review1.likes.length)
      .slice(reviewOffset.current(), reviewOffset.next())
  );
});

// reviews/order-latest => 모든 리뷰 최신순으로 보내줌
reviewRouter.get('/order-latest', (req, res) => {
  res.send(
    Reviews.state
      .sort((review1, review2) => Date.parse(review2.createdAt) - Date.parse(review1.createdAt))
      .slice(reviewOffset.current(), reviewOffset.next())
  );
});

reviewRouter.post('/', writeReview);

reviewRouter.post('/picture', upload.single('thumbnail'), uploadPicture);

reviewRouter.patch('/:id', (req, res) => {});
reviewRouter.put('/:id', (req, res) => {});
reviewRouter.delete('/:id', (req, res) => {});

module.exports = reviewRouter;
