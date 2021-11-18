const { Router } = require('express');

const {
  writeReview,
  sendReviewAndRelatedReviews,
  sendFilterdReviews,
  changeLikes,
  createComment,
  uploadPicture,
} = require('../controllers/reviewController');

const { upload, checkLoggedIn } = require('../middleware');

const { sendHtml } = require('../controllers/sendHtml');

const reviewRouter = Router();

// GET---------------------------------------------------------------------------------------
// reviews/id -> GET 특정 리뷰 for reviewDetail Page
reviewRouter.get('/:id([0-9]+)', (req, res) => {
  req.headers.accept.match(/text\/html/) ? sendHtml('reviewDetail', res) : sendReviewAndRelatedReviews(req, res);
});

reviewRouter.get('/sort', sendFilterdReviews);

// POST---------------------------------------------------------------------------------------

// reviews/review/id -> 댓글 생성
reviewRouter.post('/:id([0-9]+)', createComment);

reviewRouter.post('/', checkLoggedIn, writeReview);

reviewRouter.post('/picture', upload.single('thumbnail'), uploadPicture);

// PATCH---------------------------------------------------------------------------------------

// reviews/likes
reviewRouter.patch('/review/likes', changeLikes);

module.exports = reviewRouter;
