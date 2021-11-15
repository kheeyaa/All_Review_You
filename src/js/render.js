import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';
import Review from './components/Review';
import Aside from './components/Aside';
import ReviewDetailHeader from './components/ReviewDetailHeader';
import ReviewDetailComment from './components/ReviewDetailComment';
import ReviewDetailRelatedReview from './components/ReviewDetailRelatedReview';

export default (() => {
  const clear = () => {
    document.querySelector('.container').innerHTML = '';
  };

  // const renderMessage = reviewsLen => {
  //   document.querySelector('.search__message').textContent = `총 ${reviewsLen}개의 리뷰를 찾았습니다.`;
  // };

  return {
    home(reviews, curUserId, order) {
      clear();
      const $container = document.querySelector('.container');
      $container.classList.remove('reviewDetail');
      (() => new Header({ $app: $container, initState: { curUserId, curPage: 'main' } }))();
      (() => new Nav({ $app: $container, initState: { menuList: ['좋아요순', '최신순'], navClassName: 'main' } }))();
      (() =>
        new Main({
          $app: $container,
          initState: {
            component: 'main',
            flexDirection: 'row',
          },
        }))();

      const $reviewList = document.querySelector('.review__list');
      reviews.forEach(review => new Review({ $app: $reviewList, initState: { review, curUserId, page: 'main' } }));

      (() => new Aside({ $app: $container, initState: [...new Set(reviews.flatMap(review => review.tags))] }))();
    },

    mypage(reviews, curUserId) {
      clear();

      const $container = document.querySelector('.container');
      (() => new Header({ $app: $container, initState: { curUserId, curPage: 'mypage' } }))();
      (() =>
        new Nav({
          $app: $container,
          initState: { menuList: ['내가 작성한 리뷰', '좋아한 리뷰', '최근 읽은 리뷰'], navClassName: 'sub' },
        }))();
      (() => new Nav({ $app: $container, initState: { menuList: ['좋아요순', '최신순'], navClassName: 'main' } }))();
      (() =>
        new Main({
          $app: $container,
          initState: {
            component: 'mypage',
            flexDirection: 'column',
          },
        }))();

      const $reviewList = document.querySelector('.review__list');
      reviews.forEach(review => new Review({ $app: $reviewList, initState: { review, curUserId, page: 'mypage' } }));

      (() => new Aside({ $app: $container, initState: [...new Set(reviews.flatMap(review => review.tags))] }))();
    },

    reviewDetail(reviews, curUserId) {
      clear();

      const $container = document.querySelector('.container');
      $container.classList.add('reviewDetail');
      (() => new Header({ $app: $container, initState: { curUserId, curPage: 'reviewDetail' } }))();
      (() => new ReviewDetailHeader({ $app: $container, initState: { curUserId, review: reviews[0] } }))();
      (() => new ReviewDetailComment({ $app: $container, initState: reviews[0].comments }))();
      (() => new ReviewDetailRelatedReview({ $app: $container }))();

      const $reviewList = document.querySelector('.review__list');
      reviews[1].forEach(
        review => new Review({ $app: $reviewList, initState: { review, curUserId, page: 'reviewDetail' } })
      );
    },

    search(reviews, targets, curUserId) {
      clear();

      const $container = document.querySelector('.container');
      (() =>
        new Header({
          $app: $container,
          initState: {
            curUserId,
            curPage: 'search',
          },
        }))();

      const $searchWrap = document.createElement('div');
      $searchWrap.className = 'search-wrap';

      $searchWrap.innerHTML = `
        <div class="search">
          <form action="submit" class="search__form">
            <input type="text" class="search__input" placeholder="검색어를 입력하세요." />
            <div class="search__img">
              <img src="../images/search.svg" alt="검색" />
            </div>
          </form>
          <span class="search__message"></span>
        </div>
        `;

      $container.appendChild($searchWrap);

      (() =>
        new Main({
          $app: $searchWrap,
          initState: {
            page: 'search',
            flexDirection: 'column',
          },
        }))();

      const $reviewList = document.querySelector('.review__list');
      reviews.forEach(review => new Review({ $app: $reviewList, initState: { review, curUserId, page: 'main' } }));
    },
  };
})();

// export default (() => {

//   return {
//   home(reviews) {
//     clear();

//     document.querySelector('.container').appendChild(createNav(['좋아요순', '최신순']));

//     document.querySelector('.container').appendChild(createMain());

//     renderReviews(reviews);

//     document.querySelector('.container').appendChild(createAside());

//     renderTags([...new Set(reviews.flatMap(review => review.tags))]);
//   },

//   mypage(reviews) {
//     clear();

//     document
//       .querySelector('.container')
//       .appendChild(createNav(['내가 작성한 리뷰', '좋아한 리뷰', '최근 읽은 리뷰']));

//     document.querySelector('.container').appendChild(createNav(['좋아요순', '최신순']));

//     document.querySelector('.container').appendChild(createMain());

//     renderReviews(reviews);

//     document.querySelector('.container').appendChild(createAside());

//     renderTags([...new Set(reviews.flatMap(review => review.tags))]);
//   },

//   reviewDetail(review) {
//     clear();

//     renderReviewDetailContent(review);

//     renderReviewDetailAdd(review);
//   },

//   search(reviews, targets, curUserId) {
//     renderHeader(curUserId);
//     renderReviews(reviews, targets.$reviewList, curUserId);
//     renderMessage(reviews.length);
//   },
// };
// })();
