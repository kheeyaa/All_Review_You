import Quill from 'quill';
import util from './utils/util';

const rater = require('rater-js');

export default (() => {
  const createReadOnlyRater = (el, rate) => {
    rater({
      element: el,
      rating: rate,
      readOnly: true,
      starSize: 24,
    });
  };

  const renderHeader = curUserId => {
    ['login', 'logout', 'my-page', 'new-review'].forEach((className, i) => {
      document.querySelector(`.${className}`).classList.toggle('hidden', i ? !curUserId : curUserId);
    });
  };

  const createReview = (reviewData, curUserId) => {
    const page = window.location.pathname.replace(/\/|search/g, '');

    const $li = document.createElement('li');
    $li.className = `${page} review__card`;
    $li.dataset.reviewid = reviewData.reviewId;

    const isOneself = reviewData.likes.includes(curUserId);

    $li.innerHTML = `
    <a href="/reviews/${reviewData.reviewId}">
      <div class="${page} review__img">
        <img src="../images/test.jpg" alt="" />
      </div>
      <div class="${page} review__details">
        <h2 class="${page} title">${reviewData.title}</h2>
        <span class="${page} detail">${reviewData.content}</span>
        <time class="${page} time" datetime="${reviewData.createdAt.toString().slice(0, 10)}">
          ${util.convertTimeFormat(reviewData.createdAt)}
        </time>
        <span class="${page} author">${reviewData.userId}</span>
        <div class="${page} likes__container">
          <span class="${page} likes__count">${reviewData.likes.length}</span>
          <button class="${page} likes__button">
            <img src="../images/like.png" 
              class="${page} likes-img ${isOneself ? '' : 'hidden'}" aria-hidden="true" />
            <img src="../images/unlike.png" 
              class="${page} unlikes-img ${isOneself ? 'hidden' : ''}" aria-hidden="true" />
          </button>
        </div>
        <div class="${page} rater__wrap"><div id="rater"></div></div>
      </div>
    </a>`;

    return $li;
  };

  const renderMessage = reviewsLen => {
    document.querySelector('.search__message').textContent = `총 ${reviewsLen}개의 리뷰를 찾았습니다.`;
  };

  const renderAddReviews = (reviews, $target, curUserId) => {
    const $domFragment = document.createDocumentFragment();

    reviews.forEach(review => {
      $domFragment.appendChild(createReview(review, curUserId));
    });

    [...$domFragment.querySelectorAll('#rater')].forEach((el, i) => createReadOnlyRater(el, reviews[i].ratings));

    $target.appendChild($domFragment);
  };

  const renderReviews = (reviews, $target, curUserId) => {
    $target.innerHTML = '';
    const $domFragment = document.createDocumentFragment();

    reviews.forEach(review => {
      $domFragment.appendChild(createReview(review, curUserId));
    });

    [...$domFragment.querySelectorAll('#rater')].forEach((el, i) => createReadOnlyRater(el, reviews[i].ratings));

    $target.appendChild($domFragment);
  };

  const renderTags = (tags, $target) => {
    $target.innerHTML = tags.map(tag => `<li class="tag"><a href="" type="button">#${tag}</a></li>`).join('');
  };

  const renderReviewDetailContent = (reviewData, curUserId) => {
    const $newDiv = document.createElement('div');
    $newDiv.className = 'reviewDetail__contentWrap';

    const { title, content, userId, reviewId, tags, ratings, likes, createdAt } = reviewData;

    $newDiv.innerHTML = `
      <h2 class="a11y-hidden">리뷰</h2>
      <header class="reviewDetail__header" data-reviewid = "${reviewId}">
        <h3 class="a11y-hidden">리뷰-제목</h3>
        <p class="reviewDetail__title">${title}</p>
        <div class="reviewDetail__informWrap">
          <div class="reviewDetail__inform">
            <span class="reviewDetail__inform--userid">${userId}</span
            ><span class="reviewDetail__inform--beforeDay">${util.calculateElaspedTime(createdAt)}</span>
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
                  <img src="../images/like.png" 
                    class="likes-img ${likes.includes(curUserId) ? '' : 'hidden'}" aria-hidden="true" />
                  <img src="../images/unlike.png" 
                    class="unlikes-img ${likes.includes(curUserId) ? 'hidden' : ''}" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div class="reviewDetail__thumbnail"></div>
      <main class="reviewDetail__content"></main>`;

    const $reviewDetailContent = $newDiv.querySelector('.reviewDetail__content');

    const tmp = document.createElement('div');
    new Quill(tmp).setContents(content);
    $reviewDetailContent.innerHTML = tmp.getElementsByClassName('ql-editor')[0].innerHTML;

    createReadOnlyRater($newDiv.querySelector('#rater'), ratings);
    return $newDiv;
  };

  const renderReviewDetailComment = reviewData => {
    const $newDiv = document.createElement('div');
    $newDiv.className = 'reviewDetail__addWrap';

    const { comments } = reviewData;

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
      </section>`;

    return $newDiv;
  };

  const renderReviewDetailRelatedReview = tagRelatedReviews => {
    const $newDiv = document.createElement('div');

    $newDiv.innerHTML = `
    <section class="reviewDetail__relatedReview review-column-changewidth">
    <h2 class="reviewDetail__relatedReview--title">관련 있는 리뷰</h2>
    <div class="review-row review-column-changewidth">
      <ul class="review__list">
      </ul>
    </div>
    </section>`;

    const $reviewList = $newDiv.querySelector('.review__list');
    tagRelatedReviews.forEach(tagRelatedReview => {
      $reviewList.appendChild(createReview(tagRelatedReview));
    });

    return $newDiv;
  };

  return {
    home(reviews, targets, curUserId) {
      renderHeader(curUserId);

      renderReviews(reviews, targets.$reviewList, curUserId);

      renderTags([...new Set(reviews.flatMap(review => review.tags))], targets.$tagsList);
    },

    addReviews(reviews, targets, curUserId) {
      renderAddReviews(reviews, targets.$reviewList, curUserId);
    },

    mypage(reviews, targets, curUserId) {
      renderHeader(curUserId);

      renderReviews(reviews, targets.$reviewList, curUserId);

      renderTags([...new Set(reviews.flatMap(review => review.tags))], targets.$tagsList);
    },

    reviewDetail(review, relatedReviews, targets, curUserId) {
      renderHeader(curUserId);

      const $domFragment = document.createDocumentFragment();
      [
        renderReviewDetailContent(review, curUserId),
        renderReviewDetailComment(review),
        renderReviewDetailRelatedReview(relatedReviews),
      ].forEach($dom => $domFragment.appendChild($dom));

      targets.$reviewDetail.appendChild($domFragment);
    },

    addComments(review, targets) {
      const $addCommentCount = document.querySelector('.reviewDetail__addComments--count');
      const $commentsWrap = document.querySelector('.reviewDetail__comments > ul');
      $addCommentCount.textContent = review[0].comments.length + '개의 댓글';
      $commentsWrap.innerHTML = review[0].comments
        .map(
          review =>
            `<li class="reviewDetail__comments--items">
              <span class="reviewDetail__comments--user">${review.userId}</span>
              <span class="reviewDetail__comments--content">${review.content}</span>
            </li>`
        )
        .join('');
    },

    search(reviews, targets, curUserId) {
      renderHeader(curUserId);
      renderReviews(reviews, targets.$reviewList, curUserId);
      renderMessage(reviews.length);
    },
  };
})();
