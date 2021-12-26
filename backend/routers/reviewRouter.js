const { Router } = require('express');

const {
  writeReview,
  sendReviewAndRelatedReviews,
  sendFilteredReviews,
  changeLikes,
  createComment,
  deleteOrUpdateComment,
  uploadPicture,
  deleteReview,
} = require('../controllers/reviewController');

const { upload, checkLoggedIn } = require('../middleware');

const { sendHtml } = require('../controllers/sendHtml');

const reviewRouter = Router();

reviewRouter.get('/:id([0-9]+)', (req, res) => {
  res.format({
    'text/html': () => {
      sendHtml('reviewDetail', res);
    },
    'application/json': sendReviewAndRelatedReviews,
    default: () => {
      res.status(406).send('Not Acceptable');
    },
  });
});

reviewRouter.get('/sort', sendFilteredReviews);

reviewRouter.post('/:id([0-9]+)', createComment);

reviewRouter.post('/', checkLoggedIn, writeReview);

reviewRouter.post('/picture', upload.single('thumbnail'), uploadPicture);

reviewRouter.patch('/:id([0-9]+)', deleteOrUpdateComment);

reviewRouter.patch('/review/likes', changeLikes);

reviewRouter.delete('/:id([0-9]+)', deleteReview);

module.exports = reviewRouter;
