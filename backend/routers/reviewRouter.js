const { Router } = require('express');

const {
  writeReview,
  sendReviewAndRelatedReviews,
  sendFilterdReviews,
  sendMyReviews,
  changeLikes,
  createComment,
  uploadPicture,
  deleteReview,
} = require('../controllers/reviewController');

const { upload } = require('../middleware');

const { sendHtml } = require('../controllers/sendHtml');

const reviewRouter = Router();

// GET---------------------------------------------------------------------------------------

// reviews/mine/ -> GET 내가 쓴 리뷰
reviewRouter.get('/mine/:id', sendMyReviews);

// reviews/id -> GET 특정 리뷰 for reviewDetail Page
reviewRouter.get('/:id([0-9]+)', (req, res) => {
  req.headers.accept.match(/text\/html/) ? sendHtml('reviewDetail', res) : sendReviewAndRelatedReviews(req, res);
});

reviewRouter.get('/sort', sendFilterdReviews);

// POST---------------------------------------------------------------------------------------

// reviews/review/id -> 댓글 생성
reviewRouter.post('/:id([0-9]+)', createComment);

reviewRouter.post('/', writeReview);

reviewRouter.post('/picture', upload.single('thumbnail'), uploadPicture);

// PATCH ---------------------------------------------------------------------------------------

// reviews/likes
reviewRouter.patch('/review/likes', changeLikes);

// DELETE ---------------------------------------------------------------------------------------

reviewRouter.delete('/:id([0-9]+)', deleteReview);

module.exports = reviewRouter;
