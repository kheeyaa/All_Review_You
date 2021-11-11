const Reviews = require('../models/Review');

const isExistTag = (tags, keyword) => tags.some(tag => tag.match(keyword));

exports.findSearchResult = (req, res) => {
  // https://www.codegrepper.com/code-examples/javascript/axios+query+parameters
  const { keyword } = req.query;

  res.send(
    Reviews.state
      .filter(({ title, content, tags }) => title.match(keyword) || content.match(keyword) || isExistTag(tags, keyword))
      .map(({ content, photos }, i, reviews) => ({
        ...reviews[i],
        content: content.slice(0, 300),
        photos: photos.slice(0, 1),
      }))
  );
};
