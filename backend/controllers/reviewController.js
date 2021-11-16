const Review = require('../models/Review');

exports.getOneReview = (req, res) => {
  const { id } = req.params;
  const review = Review.state.find(({ reviewId }) => +id === reviewId);
  if (!review) res.status(400).send('존재하지 않는 리뷰입니다.');

  res.send(review);
};

exports.writeReview = (req, res) => {
  const { title, content, photos, tags, ratings } = req.body;
  const newReview = {
    title,
    userId: req.userId,
    reviewId: Review.generateId(),
    content,
    photos,
    tags,
    ratings,
    likes: [],
    comments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  Review.state = newReview;
  console.log(newReview);
  res.send(newReview);
};

exports.uploadPicture = (req, res) => {};
