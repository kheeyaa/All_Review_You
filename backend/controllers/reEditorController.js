const Review = require('../models/Review');

exports.sendReivew = (req, res) => {
  const { id } = req.params;
  const review = Review.state.find(({ reviewId }) => +id === reviewId);
  if (!review) res.status(400).send('존재하지 않는 리뷰입니다.');

  res.send(review);
};

exports.rewriteReview = (req, res) => {
  const { title, content, thumbnail, reviewId, tags, ratings, createdAt, likes, comments } = req.body;

  const summary =
    content.ops
      .filter(op => typeof op.insert === 'string')
      .map(op => op.insert)
      .join('')
      .trim() || '내용이 없습니다.';

  const newReview = {
    title,
    userId: req.userId,
    reviewId,
    summary,
    content,
    thumbnail,
    tags,
    ratings,
    likes,
    comments,
    createdAt,
    updatedAt: new Date(),
  };

  Review.change(reviewId, newReview);

  res.send(newReview);
};
