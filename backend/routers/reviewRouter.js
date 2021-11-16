const express = require('express');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const path = require('path');
const compiler = webpack(require('../../webpack.config'));
const { createReview, writeReview, getOneReview } = require('../controllers/reviewController');

const app = express();
app.use(middleware(compiler));

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
  // console.log(Reviews.state.filter(({ reviewId }) => reviewId === +req.params.id));
  res.format({
    // 새로고침에 의한 브라우저 요청에 대해 html을 응답
    'text/html': () => {
      // 웹팩이 처리한 html 경로를 찾는다.
      const filename = path.join(compiler.outputPath, 'reviewDetail.html');
      // 그 경로에에서 html 파일을 읽는다.
      compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) return;
        res.set('content-type', 'text/html').end(result);
      });
    },
    // ajax 요청에 대해 json을 응답
    'application/json': () => {
      const curReview = Reviews.state.filter(({ reviewId }) => reviewId === +req.params.id);
      const reviewTags = curReview[0].tags;
      const tagRelatedReviews = Reviews.state.filter(({ reviewId, tags }) => {
        for (let i = 0; i < tags.length; i++) {
          if (reviewTags.includes(tags[i]) && reviewId !== +req.params.id) return true;
        }
        return false;
      });
      res.send([curReview, tagRelatedReviews]);
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
      state.forEach(({ reviewId, comments }, i) => {
        const generateId = () => Math.max(...comments.map(cur => cur.commentId)) + 1;
        if (+inReviewId === reviewId) {
          state[i].comments = [...state[i].comments, { commentId: generateId(), userId: inUserId, content: inContent }];
        }
      });
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

// reviews/order-likes => 모든 리뷰 좋아요순으로 보내줌
reviewRouter.get('/order-likes', (req, res) => {
  res.send(Reviews.state.sort((review1, review2) => review2.likes.length - review1.likes.length));
});

// reviews/order-latest => 모든 리뷰 최신순으로 보내줌
reviewRouter.get('/order-latest', (req, res) => {
  res.send(Reviews.state.sort((review1, review2) => Date.parse(review2.createdAt) - Date.parse(review1.createdAt)));
});

reviewRouter.post('/', writeReview);
reviewRouter.patch('/:id', (req, res) => {});
reviewRouter.put('/:id', (req, res) => {});
reviewRouter.delete('/:id', (req, res) => {});

module.exports = reviewRouter;
