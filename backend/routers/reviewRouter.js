const { Router } = require('express');

const {
  writeReview,
  sendReviewAndRelatedReviews,
  sendFilterdReviews,
  changeLikes,
  createComment,
  uploadPicture,
  deleteReview,
} = require('../controllers/reviewController');

const { upload, checkLoggedIn } = require('../middleware');

const { sendHtml } = require('../controllers/sendHtml');

const reviewRouter = Router();

// GET---------------------------------------------------------------------------------------
// reviews/id -> GET 특정 리뷰 for reviewDetail Page
reviewRouter.get('/:id([0-9]+)', (req, res) => {
  res.format({
    'text/html': () => {
      sendHtml('reviewDetail', res);
    },
    // ajax 요청에 대해 json을 응답
    'application/json': sendReviewAndRelatedReviews,
    default: () => {
      // log the request and respond with 406
      res.status(406).send('Not Acceptable');
    },
  });
});

reviewRouter.get('/sort', sendFilterdReviews);

// POST---------------------------------------------------------------------------------------

// reviews/review/id -> 댓글 생성
reviewRouter.post('/:id([0-9]+)', createComment);

reviewRouter.post('/', checkLoggedIn, writeReview);

reviewRouter.post('/picture', upload.single('thumbnail'), uploadPicture);

// PATCH ---------------------------------------------------------------------------------------

// reviews/likes
reviewRouter.patch('/review/likes', changeLikes);

// DELETE ---------------------------------------------------------------------------------------

reviewRouter.delete('/:id([0-9]+)', deleteReview);

module.exports = reviewRouter;
