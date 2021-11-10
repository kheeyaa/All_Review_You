const Comment = (() => {
  let state = [
    {
      userId: 1,
      content: '너무 맛이 없네요',
      reviewId: 1,
    },
    {
      userId: 2,
      content: '좋네요',
      reviewId: 1,
    },
    {
      userId: 3,
      content: 'ㅎㅇㅎㅇ',
      reviewId: 1,
    },
  ];

  return {
    get state() {
      return state;
    },

    set state(newComment) {
      state = [...state, newComment];
    },
  };
})();

module.exports = Comment;
