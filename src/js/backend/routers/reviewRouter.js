const { Router } = require('express');

const reviewRouter = Router();

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
  res.send(Reviews.state.filter(({ reviewId }) => reviewId === +req.params.id));
});

// reviews/all => 모든 리뷰 보내줌
reviewRouter.get('/all', (req, res) => {
  res.send(Reviews.state);
});

reviewRouter.post('/', (req, res) => {});
reviewRouter.patch('/:id', (req, res) => {});
reviewRouter.put('/:id', (req, res) => {});
reviewRouter.delete('/:id', (req, res) => {});

module.exports = reviewRouter;
