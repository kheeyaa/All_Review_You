import utils from './utils';
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';
import Review from './components/Review';
import Aside from './components/Aside';

export default (() => {
  const clear = () => {
    document.querySelector('.container').innerHTML = '';
  };

  // const renderMessage = reviewsLen => {
  //   document.querySelector('.search__message').textContent = `총 ${reviewsLen}개의 리뷰를 찾았습니다.`;
  // };

  const renderReviewDetailContent = (reviewData, curUserId) => {
    const $newDiv = document.createElement('div');
    $newDiv.className = 'reviewDetail__contentWrap';

    const { title, userId, reviewId, content, photos, tags, ratings, likes, comments, createdAt, updatedAt } =
      reviewData;

    $newDiv.innerHTML = `
      <h2 class="a11y-hidden">리뷰</h2>
      <header class="reviewDetail__header" data-reviewid = "${reviewId}">
        <h3 class="a11y-hidden">리뷰-제목</h3>
        <p class="reviewDetail__title">${title}</p>
        <div class="reviewDetail__informWrap">
          <div class="reviewDetail__inform">
            <span class="reviewDetail__inform--userid">${userId}</span
            ><span class="reviewDetail__inform--beforeDay">${utils.calculateElaspedTime(createdAt)}</span>
            <div class="reviewDetail__inform--tag">
              ${tags.map(tag => `<span class="reviewDetail__inform--tag--text"># ${tag}</span>`).join('')}
            </div>
          </div>
          <div class="reviewDetail__addInform">
            <div class="reviewDetail__addInform--ratingWrap">
              <span class="reviewDetail__addInform--ratingText">Ratings</span>
              <div class="reviewDetail__addInform--starsWrap">
                <span class="reviewDetail__addInform--starsCount">${ratings}</span>
                <div class="reviewDetail__addInform--stars"><div id="rater"></div></div>
              </div>
            </div>
            <div class="reviewDetail__addInform--likesWrap">
              <span class="reviewDetail__addInform--likesText">likes</span>
              <div class="reviewDetail__addInform--likesSubWrap">
                <span class="reviewDetail__addInform--likesCount likes__count">${likes.length}</span>
                <button class="likes__button">
                  <img src="../images/like.png" class="likes-img ${
                    likes.includes(curUserId) ? '' : 'hidden'
                  }" aria-hidden="true" />
                  <img src="../images/unlike.png" class="unlikes-img ${
                    likes.includes(curUserId) ? 'hidden' : ''
                  }" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>`;

    document.querySelector('.container').appendChild($newDiv);
  };

  const renderReviewDetailAdd = reviewData => {
    const $newDiv = document.createElement('div');
    $newDiv.className = 'reviewDetail__addWrap';

    const { title, userId, reviewId, content, photos, tags, ratings, likes, comments, createdAt, updatedAt } =
      reviewData;

    $newDiv.innerHTML = `
    <!-- 리뷰 본문 외 -->
      <h2 class="a11y-hidden">댓글</h2>
      <!-- 댓글 작성하기-->
      <section class="reviewDetail__addComments">
        <h3 class="a11y-hidden">댓글 작성</h3>
        <form action="" class="reviewDetail__addComments--form">
          <label for="comment" class="reviewDetail__addComments--count">${comments.length}개의 댓글</label>
          <input
            type="text"
            id="comment"
            class="reviewDetail__addComments--input"
            name="comment"
            placeholder="댓글을 작성하세요"
          />
          <div class="reviewDetail__addComments--btnWrap">
            <button type="submit" class="reviewDetail__addComments--cancel">취소</button>
            <button type="submit" class="reviewDetail__addComments--confirm">댓글 작성</button>
          </div>
        </form>
      </section>

      <!-- 댓글 리스트 -->
      <section class="reviewDetail__comments">
        <h3 class="a11y-hidden">댓글 리스트</h3>
        <ul>
          ${comments
            .map(
              ({ userId, content }) => `
          <li class="reviewDetail__comments--items">
            <span class="reviewDetail__comments--user">${userId}</span>
            <span class="reviewDetail__comments--content">${content}</span>
          </li>`
            )
            .join('')}
        </ul>
      </section>

      <!-- 관련 있는 리뷰 -->
      <section class="reviewDetail__relatedReview review-column-changewidth">
        <h2 class="reviewDetail__relatedReview--title">관련 있는 리뷰</h2>
        <div class="review-row review-column-changewidth">
          <ul class="review__list">
            <li class="review__card">
              <div class="review__img"><img src="../images/test.jpg" alt="" /></div>
              <div class="review__details">
                <h3 class="title">제목</h3>
                <span class="detail">설명글</span>
                <time datetime="2021-11-07">2021년 11월 07일</time>
                <span class="author">작성자 아이디</span>
                <div class="likes__container">
                  <span class="likes__count">20</span>
                  <button class="likes__button">
                    <img src="../images/like.png" class="likes-img" aria-hidden="true" />
                    <img src="../images/unlike.png" class="unlikes-img hidden" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
            <li class="review__card">
              <div class="review__img"><img src="../images/test.jpg" alt="" /></div>
              <div class="review__details">
                <h3 class="title">제목</h3>
                <span class="detail">설명글</span>
                <time datetime="2021-11-07">2021년 11월 07일</time>
                <span class="author">작성자 아이디</span>
                <div class="likes__container">
                  <span class="likes__count">20</span>
                  <button class="likes__button">
                    <img src="../images/like.png" class="likes-img" aria-hidden="true" />
                    <img src="../images/unlike.png" class="unlikes-img hidden" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
            <li class="review__card">
              <div class="review__img"><img src="../images/test.jpg" alt="" /></div>
              <div class="review__details">
                <h3 class="title">제목</h3>
                <span class="detail">설명글</span>
                <time datetime="2021-11-07">2021년 11월 07일</time>
                <span class="author">작성자 아이디</span>
                <div class="likes__container">
                  <span class="likes__count">20</span>
                  <button class="likes__button">
                    <img src="../images/like.png" class="likes-img" aria-hidden="true" />
                    <img src="../images/unlike.png" class="unlikes-img hidden" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>`;

    document.querySelector('.container').appendChild($newDiv);
  };

  return {
    home(reviews, curUserId, order) {
      clear();

      const $container = document.querySelector('.container');
      (() => new Header({ $app: $container, initState: curUserId }))();
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
      (() => new Header({ $app: $container, initState: curUserId }))();
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
      (() => new Header({ $app: $container, initState: curUserId }))();

      // renderHeader(curUserId);

      renderReviewDetailContent(reviews[0], curUserId);

      renderReviewDetailAdd(reviews[0]);
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
