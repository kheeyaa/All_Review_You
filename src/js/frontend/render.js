import utils from './utils';
import header from './header';
import Header from './header';

export default (() => {
  const renderHeader = curUserId => {
    document.querySelector('.login').classList.toggle('hidden', curUserId);
    document.querySelector('.logout').classList.toggle('hidden', !curUserId);
    document.querySelector('.my-page').classList.toggle('hidden', !curUserId);
    document.querySelector('.new-review').classList.toggle('hidden', !curUserId);
  };

  const clear = () => {
    document.querySelector('.container').innerHTML = '';
  };

  const createNav = menuList => {
    const $nav = document.createElement('nav');
    $nav.className = 'nav';

    $nav.innerHTML = `
      <ul class="nav__list">
        <h2 class="a11y-hidden">메뉴</h2>
        ${menuList
          .map(
            (menu, i) => `
        <li class="${i === 0 ? 'nav__now' : ''}">
          <a href="">${menu}</a>
        </li>`
          )
          .join('')}
      </ul>`;

    return $nav;
  };

  const createMain = () => {
    const page = window.location.pathname.replace(/\/|.html/g, '') === 'mypage' ? 'mypage' : '';
    const $main = document.createElement('main');
    $main.className = `review-row`;

    $main.innerHTML = `
    <h2 class="a11y-hidden">리뷰 리스트</h2>
    <ul class="${page} review__list"></ul>`;

    return $main;
  };

  const createAside = () => {
    const $aside = document.createElement('aside');
    $aside.className = 'tags';

    $aside.innerHTML = `
    <h2 class="tags__title">Tag List</h2>
    <ul class="tags__list"></ul>`;

    return $aside;
  };

  const renderMessage = reviewsLen => {
    document.querySelector('.search__message').textContent = `총 ${reviewsLen}개의 리뷰를 찾았습니다.`;
  };

  const createReadOnlyRater = (el, rate) => {
    rater({
      element: el,
      rating: rate,
      readOnly: true,
      starSize: 24,
    });
  };

  const renderReviews = (reviews, curUserId, order) => {
    const $target = document.querySelector('.review__list');

    const page = window.location.pathname.replace(/\/|.html/g, '') === 'mypage' ? 'mypage' : '';

    $target.innerHTML = reviews
      .sort((review1, review2) =>
        order === 'likes'
          ? review2.likes.length - review1.likes.length
          : Date.parse(review2.createdAt) - Date.parse(review1.createdAt)
      )
      .map(
        ({ title, userId, reviewId, content, photos, tags, ratings, likes, comments, createdAt, updatedAt }) => `
      <li class="${page} review__card" data-reviewid="${reviewId}">
        <a href="/reviews">
          <div class="${page} review__img"><img src="../images/test.jpg" alt="" /></div>
          <div class="${page} review__details">
            <h2 class="${page} title">${title}</h2>
            <span class="${page} detail">${content}</span>
            <time class="${page} time" datetime="${createdAt.toString().slice(0, 10)}">
              ${utils.convertTimeFormat(createdAt)}
            </time>
            <span class="${page} author">${userId}</span>
            <div class="${page} likes__container">
              <span class="${page} likes__count">${likes.length}</span>
              <button class="${page} likes__button">
                <img src="../images/like.png" class="${page} likes-img ${
          likes.includes(curUserId) ? '' : 'hidden'
        }" aria-hidden="true" />
                <img src="../images/unlike.png" class="${page} unlikes-img ${
          likes.includes(curUserId) ? 'hidden' : ''
        }" aria-hidden="true" />
              </button>
            </div>
            <div class="${page} rater__wrap"><div id="rater"></div></div>
          </div>
        </a>
      </li>`
      )
      .join('');

    [...document.querySelectorAll('#rater')].forEach((el, i) => createReadOnlyRater(el, reviews[i].ratings));
  };

  const renderTags = tags => {
    document.querySelector('.tags__list').innerHTML = tags
      .map(tag => `<li class="tag"><a href="" type="button">#${tag}</a></li>`)
      .join('');
  };

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
      (() => new Header({ $app: document.querySelector('.container'), initState: curUserId }))();

      // clear();
      // renderHeader(curUserId);
      // document.querySelector('.container').appendChild(createNav(['좋아요순', '최신순']));
      // document.querySelector('.container').appendChild(createMain());
      // renderReviews(reviews, curUserId, order);
      // document.querySelector('.container').appendChild(createAside());
      // renderTags([...new Set(reviews.flatMap(review => review.tags))]);
    },

    mypage(reviews, curUserId) {
      clear();

      renderHeader(curUserId);

      document
        .querySelector('.container')
        .appendChild(createNav(['내가 작성한 리뷰', '좋아한 리뷰', '최근 읽은 리뷰']));

      document.querySelector('.container').appendChild(createNav(['좋아요순', '최신순']));

      document.querySelector('.container').appendChild(createMain());

      renderReviews(reviews, curUserId);

      document.querySelector('.container').appendChild(createAside());

      renderTags([...new Set(reviews.flatMap(review => review.tags))]);
    },

    reviewDetail(review, curUserId) {
      clear();

      renderHeader(curUserId);

      renderReviewDetailContent(review, curUserId);

      renderReviewDetailAdd(review);
    },

    search(reviews, targets, curUserId) {
      renderHeader(curUserId);
      renderReviews(reviews, targets.$reviewList, curUserId);
      renderMessage(reviews.length);
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
