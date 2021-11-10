const Review = (() => {
  let state = [
    {
      title: '곱창',
      userId: 1,
      reviewId: 1,
      content: '',
      photos: [],
      tags: ['곱창맛집'],
      ratings: 4.5,
      likes: 5,
      createdAt: new Date(2008, 11, 3),
      updatedAt: new Date(),
    },
    {
      title: '올리브',
      userId: 2,
      reviewId: 2,
      content: '',
      photos: [],
      tags: ['m1'],
      ratings: 4,
      likes: 13,
      createdAt: new Date(2020, 4, 14),
      updatedAt: new Date(),
    },
    {
      title: '맥북',
      userId: 1,
      reviewId: 3,
      content: '',
      photos: [],
      tags: ['맥북'],
      ratings: 2.5,
      likes: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return {
    get state() {
      return state;
    },

    set state(newReview) {
      state = [...state, newReview];
    },
  };
})();

module.exports = Review;
