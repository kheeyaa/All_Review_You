const Review = (() => {
  let state = [
    {
      title: '곱창',
      userId: 'kheeyaa',
      reviewId: 0,
      content:
        '메롱 음식 오늘은 곱창 맛집에 찾아왔다. 강남 곱창 맛집은 정말 맛있었다. 냠냠냠...오늘은 곱창 맛집에 찾아왔다. 강남 곱창 맛집은 정말 맛있었다. 냠냠냠...오늘은 곱창 맛집에 찾아왔다. 강남 곱창 맛집은 정말 맛있었다. 냠냠냠...오늘은 곱창 맛집에 찾아왔다. 강남 곱창 맛집은 정말 맛있었다. 냠냠냠...오늘은 곱창 맛집에 찾아왔다. 강남 곱창 맛집은 정말 맛있었다. 냠냠냠...오늘은 곱창 맛집에 찾아왔다. 강남 곱창 맛집은 정말 맛있었다. 냠냠냠...오늘은 곱창 맛집에 찾아왔다. 강남 곱창 맛집은 정말 맛있었다. 냠냠냠...',
      photos: [],
      tags: ['곱창맛집'],
      ratings: 4.5,
      likes: ['jkrang1702', 'jkrang105', 'jkrang104', 'kheeyaa'],
      comments: [
        {
          commentId: 1,
          userId: 'jkrang1702',
          content: '너무 맛이 없네요',
        },
        {
          commentId: 2,
          userId: 'jkrang105',
          content: '난 맛있는데',
        },
      ],
      createdAt: new Date(2008, 11, 3),
      updatedAt: new Date(2008, 11, 3),
    },
    {
      title: '곱창',
      userId: 'jkrang104',
      reviewId: 1,
      content:
        '메롱 음식 오늘은 곱창 맛집에 찾아왔다. 강남 곱창 맛집은 정말 맛있었다. 냠냠냠...오늘은 곱창 맛집에 찾아왔다. 강남 곱창 맛집은 정말 맛있었다. 냠냠냠...오늘은 곱창 맛집에 찾아왔다. 강남 곱창 맛집은 정말 맛있었다. 냠냠냠...오늘은 곱창 맛집에 찾아왔다. 강남 곱창 맛집은 정말 맛있었다. 냠냠냠...오늘은 곱창 맛집에 찾아왔다. 강남 곱창 맛집은 정말 맛있었다. 냠냠냠...오늘은 곱창 맛집에 찾아왔다. 강남 곱창 맛집은 정말 맛있었다. 냠냠냠...오늘은 곱창 맛집에 찾아왔다. 강남 곱창 맛집은 정말 맛있었다. 냠냠냠...',
      photos: [],
      tags: ['곱창맛집'],
      ratings: 4.5,
      likes: ['jkrang1702', 'jkrang105', 'jkrang104'],
      comments: [
        {
          commentId: 1,
          userId: 'jkrang1702',
          content: '너무 맛이 없네요',
        },
        {
          commentId: 2,
          userId: 'jkrang105',
          content: '난 맛있는데',
        },
      ],
      createdAt: new Date(2009, 11, 3),
      updatedAt: new Date(2009, 11, 3),
    },
    {
      title: '올리브',
      userId: 'jkrang1702',
      reviewId: 2,
      content:
        '메롱 음식 올리브는 감자가 아니다. 올리브는 감자가 아니다. 올리브는 감자가 아니다. 올리브는 감자가 아니다. 올리브는 감자가 아니다. 올리브는 감자가 아니다. 올리브는 감자가 아니다. 올리브는 감자가 아니다. 올리브는 감자가 아니다. 올리브는 감자가 아니다. 올리브는 감자가 아니다. 올리브는 감자가 아니다. 올리브는 감자가 아니다. 올리브는 감자가 아니다. 올리브는 감자가 아니다. 올리브는 감자가 아니다. 올리브는 감자가 아니다. 올리브는 감자가 아니다. 올리브는 감자가 아니다. 올리브는 감자가 아니다. 올리브는 감자가 아니다. 올리브는 감자가 아니다.',
      photos: [],
      tags: ['m1'],
      ratings: 4,
      likes: ['jkrang104'],
      comments: [],
      createdAt: new Date(2010, 4, 14),
      updatedAt: new Date(2010, 4, 14),
    },
    {
      title: '맥북',
      userId: 'jkrang104',
      reviewId: 3,
      content:
        '메롱 맥북은 비싸다. 그치만 애플 최고~ 맥북은 비싸다. 그치만 애플 최고~ 맥북은 비싸다. 그치만 애플 최고~ 그치만 애플 최고~ 맥북은 비싸다. 그치만 애플 최고~ 그치만 애플 최고~ 맥북은 비싸다. 그치만 애플 최고~ 그치만 애플 최고~ 맥북은 비싸다. 그치만 애플 최고~ 그치만 애플 최고~ 맥북은 비싸다. 그치만 애플 최고~ 그치만 애플 최고~ 맥북은 비싸다. 그치만 애플 최고~ 그치만 애플 최고~ 맥북은 비싸다. 그치만 애플 최고~ 그치만 애플 최고~ 맥북은 비싸다. 그치만 애플 최고~ 그치만 애플 최고~ 맥북은 비싸다. 그치만 애플 최고~ 그치만 애플 최고~ 맥북은 비싸다. 그치만 애플 최고~ 그치만 애플 최고~ 맥북은 비싸다. 그치만 애플 최고~ ',
      photos: [],
      tags: ['맥북'],
      ratings: 2.5,
      likes: ['kheeyaa'],
      comments: [],
      createdAt: new Date(2020, 3, 10),
      updatedAt: new Date(2020, 3, 10),
    },
  ];

  return {
    get state() {
      return state;
    },

    set state(newReview) {
      state = [...state, newReview];
    },

    add(newReview) {
      state = [...state, newReview];
    },

    change(curReviewId, newReview) {
      state = state.map(({ reviewId }, i) => (curReviewId === reviewId ? newReview : state[i]));
    },
  };
})();

module.exports = Review;
