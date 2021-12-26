const Review = require('../models/Review');

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

  Review.add(newReview);

  res.send(newReview);
};

exports.uploadPicture = (req, res) => {
  try {
    res.send(`/images/${req.file.filename}`);
  } catch (e) {
    console.log(e.message);
  }
};

exports.sendReviewAndRelatedReviews = (req, res) => {
  const targetReview = Review.state.filter(({ reviewId }) => reviewId === +req.params.id)[0];
  const relatedReview = Review.state.filter(
    ({ reviewId, tags }) => reviewId !== targetReview.reviewId && targetReview.tags.some(tag => tags.includes(tag))
  );

  res.send([targetReview, relatedReview]);
};

exports.sendFilteredReviews = (req, res) => {
  const { filter, selectedTag, keyword, reset } = req.query;

  const { likesOrLatest, mineOrFavorite } = JSON.parse(filter || '{}');

  if (reset) Review.reset();

  let filteredReviews = Review.state.sort((one, other) =>
    likesOrLatest === 'likes'
      ? other.likes.length - one.likes.length
      : Date.parse(other.createdAt) - Date.parse(one.createdAt)
  );

  if (mineOrFavorite)
    filteredReviews = filteredReviews.filter(({ userId, likes }) =>
      mineOrFavorite === 'mine' ? userId === req.userId : likes.includes(req.userId)
    );

  if (selectedTag) filteredReviews = filteredReviews.filter(({ tags }) => tags.includes(selectedTag));

  const isExistTag = (tags, keyword) => tags.some(tag => tag.match(keyword));

  if (keyword)
    filteredReviews = Review.state
      .filter(({ title, content, tags }) => title.match(keyword) || content.match(keyword) || isExistTag(tags, keyword))
      .map(({ content, photos }, i, reviews) => ({
        ...reviews[i],
        content: content.slice(0, 300),
        photos: photos.slice(0, 1),
      }));

  let tags = new Map();

  if (!keyword)
    Review.state
      .flatMap(review => review.tags)
      .forEach(tag => {
        tags.set(tag, tags.get(tag) ? tags.get(tag) + 1 : 1);
      });

  tags = [...tags]
    .sort((tag1, tag2) => tag2[1] - tag1[1])
    .slice(0, 10)
    .map(tag => tag[0]);

  res.send({
    reviews: filteredReviews.slice(Review.current, Review.next),
    tags: keyword ? null : tags,
    totalNum: keyword ? filteredReviews.length : null,
  });
};

exports.changeLikes = (req, res) => {
  const { curReviewId } = req.body;

  const review = Review.state.filter(({ reviewId }) => reviewId === +curReviewId)[0];

  const { likes } = review;
  const isLiked = review.likes.includes(req.userId);

  isLiked
    ? Review.change(+curReviewId, { ...review, likes: likes.filter(like => like !== req.userId) })
    : Review.change(+curReviewId, { ...review, likes: [...likes, req.userId] });

  res.send(!isLiked);
};

exports.createComment = (req, res) => {
  const { inUserId, inContent, inReviewId } = req.body;
  const state = [...Review.state];

  if (inContent.trim().length > 0) {
    state.forEach(({ reviewId, comments }, i) => {
      const generateId = () => Math.max(...comments.map(cur => cur.commentId), 0) + 1;
      if (+inReviewId === reviewId) {
        state[i].comments = [...state[i].comments, { commentId: generateId(), userId: inUserId, content: inContent }];
      }
    });
    res.send(Review.state.filter(({ reviewId }) => reviewId === +req.params.id));
  }
};

exports.deleteOrUpdateComment = (req, res) => {
  const { inReviewId, dataCommentId, mode, changedComment } = req.body;
  const state = [...Review.state];

  if (mode === 'delete') {
    state.forEach(({ reviewId }, i) => {
      if (+inReviewId === reviewId) {
        state[i].comments = state[i].comments.filter(comment => +dataCommentId !== comment.commentId);
      }
    });
    res.send(Review.state.filter(({ reviewId }) => reviewId === +req.params.id));
  }
  if (mode === 'edit') {
    state.forEach(({ reviewId }, i) => {
      if (+inReviewId === reviewId) {
        state[i].comments.forEach(comment => {
          if (+dataCommentId === comment.commentId) {
            comment.content = changedComment;
          }
        });
      }
    });
    res.send(Review.state.filter(({ reviewId }) => reviewId === +req.params.id));
  }
};

exports.deleteReview = (req, res) => {
  Review.delete(+req.params.id);
  res.send();
};
