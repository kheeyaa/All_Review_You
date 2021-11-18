const { Router } = require('express');

const {
  writeReview,
  sendReviewAndRelatedReviews,
  sendFilterdReviews,
  changeLikes,
  createComment,
  uploadPicture,
} = require('../controllers/reviewController');

const { upload } = require('../middleware');

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

reviewRouter.post('/', writeReview);

reviewRouter.post('/picture', upload.single('thumbnail'), uploadPicture);

// PATCH---------------------------------------------------------------------------------------

// reviews/likes
reviewRouter.patch('/review/likes', changeLikes);

module.exports = reviewRouter;
