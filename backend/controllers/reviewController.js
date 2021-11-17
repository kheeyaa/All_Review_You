const Review = require('../models/Review');

exports.getOneReview = (req, res) => {
  const { id } = req.params;
  const review = Review.state.find(({ reviewId }) => +id === reviewId);
  if (!review) res.status(400).send('존재하지 않는 리뷰입니다.');

  res.send(review);
};

exports.writeReview = (req, res) => {
  const { title, content, thumbnail, tags, ratings } = req.body;

  const summary =
    content.ops
      .filter(op => typeof op.insert === 'string')
      .map(op => op.insert)
      .join('')
      .trim() || '내용이 없습니다.';

  const newReview = {
    title,
    userId: req.userId,
    reviewId: Review.generateId(),
    summary,
    content,
    thumbnail,
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

exports.uploadPicture = (req, res) => {
  console.log(req.file);
  res.send(`../images/${req.file.filename}`);
};
