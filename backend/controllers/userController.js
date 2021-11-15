exports.getMe = (req, res) => {
  res.send(req.userId);
};
