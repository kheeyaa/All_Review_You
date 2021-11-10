export default (() => {
  const convertTimeFormat = date => {
    const [year, month, day] = date.toString().slice(0, 10).split('-');

    return `${year}년 ${month}월 ${day}일`;
  };

  const timeForToday = value => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금 전';
    if (betweenTime < 60) {
      return `${betweenTime}분 전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간 전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일 전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년 전`;
  };

  const renderMessage = reviewsLen => {
    document.querySelector('.search__message').textContent = `총 ${reviewsLen}개의 리뷰를 찾았습니다.`;
  };

  const renderReviews = (reviews, $target) => {
    const page = window.location.pathname.replace(/\/|.html/g, '') === 'mypage' ? 'mypage' : '';

    $target.innerHTML = reviews
      .map(
        ({ title, userId, reviewId, content, photos, tags, ratings, likes, comments, createdAt, updatedAt }) => `
      <li class="${page} review__card">
        <a href="./reviewDetail.html">
          <div class="${page} review__img"><img src="../images/test.jpg" alt="" /></div>
          <div class="${page} review__details">
            <h2 class="${page} title">${title}</h2>
            <span class="${page} detail">${content}</span>
            <time class="${page} time" datetime="${createdAt.toString().slice(0, 10)}">
              ${convertTimeFormat(createdAt)}
            </time>
            <span class="${page} author">${userId}</span>
            <div class="${page} likes__container">
              <span class="${page} likes__count">${likes.length}</span>
              <button class="${page} likes__button">
                <img src="../images/like.png" class="${page} likes-img" aria-hidden="true" />
                <img src="../images/unlike.png" class="${page} unlikes-img hidden" aria-hidden="true" />
              </button>
            </div>
          </div>
        </a>
      </li>`
      )
      .join('');
  };

  const renderTags = (tags, $target) => {
    $target.innerHTML = tags.map(tag => `<li class="tag"><a href="" type="button">#${tag}</a></li>`).join('');
  };

  const renderReviewDetailContent = (reviewData, $target) => {
    if ($target.querySelector('.reviewDetail__contentWrap'))
      $target.querySelector('.reviewDetail__contentWrap').remove();

    const $newDiv = document.createElement('div');
    $newDiv.className = 'reviewDetail__contentWrap';

    const { title, userId, reviewId, content, photos, tags, ratings, likes, comments, createdAt, updatedAt } =
      reviewData;

    $newDiv.innerHTML = `
      <h1 class="a11y-hidden">본문 영역</h1>
      <header class="reviewDetail__header">
        <h2 class="a11y-hidden">제목 영역</h2>
        <p class="reviewDetail__title">${title}</p>
        <div class="reviewDetail__informWrap">
          <div class="reviewDetail__inform">
            <span class="reviewDetail__inform--userid">${userId}</span
            ><span class="reviewDetail__inform--beforeDay">${timeForToday(createdAt)}</span>
            <div class="reviewDetail__inform--tag">
              ${tags.map(tag => `<span class="reviewDetail__inform--tag--text"># ${tag}</span>`).join('')}
            </div>
          </div>
          <div class="reviewDetail__addInform">
            <div class="reviewDetail__addInform--ratingWrap">
              <span class="reviewDetail__addInform--ratingText">Ratings</span>
              <div class="reviewDetail__addInform--starsWrap">
                <span class="reviewDetail__addInform--starsCount">${ratings}</span>
                <div class="reviewDetail__addInform--stars">🌟🌟🌟🌟🌟</div>
              </div>
            </div>
            <div class="reviewDetail__addInform--likesWrap">
              <span class="reviewDetail__addInform--likesText">likes</span>
              <div class="reviewDetail__addInform--likesSubWrap">
                <span class="reviewDetail__addInform--likesCount">${likes.length}</span>
                <button class="likes__button">
                  <img src="../images/like.png" class="likes-img" aria-hidden="true" />
                  <img src="../images/unlike.png" class="unlikes-img hidden" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>`;

    $target.appendChild($newDiv);
  };

  const renderReviewDetailAdd = (reviewData, $target) => {
    if ($target.querySelector('.reviewDetail__addWrap')) $target.querySelector('.reviewDetail__addWrap').remove();

    const $newDiv = document.createElement('div');
    $newDiv.className = 'reviewDetail__addWrap';

    const { title, userId, reviewId, content, photos, tags, ratings, likes, comments, createdAt, updatedAt } =
      reviewData;

    $newDiv.innerHTML = `
    <!-- 리뷰 본문 외 -->
      <h2 class="a11y-hidden">댓글 및 관련 리뷰</h2>
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
      <aside class="reviewDetail__relatedReview">
        <h3 class="reviewDetail__relatedReview--title">관련 있는 리뷰</h2>
          <ul class="review__list">
            <li class="review__card">
              <div class="review__img"><img src="../images/test.jpg" alt="" /></div>
              <div class="review__details">
                <h2 class="title">제목</h2>
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
                <h2 class="title">제목</h2>
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
                <h2 class="title">제목</h2>
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
      </aside>`;

    $target.appendChild($newDiv);
  };

  return {
    home(reviews, targets) {
      renderReviews(reviews, targets.$reviewList);

      renderTags(
        reviews.flatMap(review => review.tags),
        targets.$tagsList
      );
    },

    mypage(reviews, targets) {
      renderReviews(reviews, targets.$reviewList);

      renderTags(
        reviews.flatMap(review => review.tags),
        targets.$tagsList
      );
    },

    reviewDetail(review, targets) {
      renderReviewDetailContent(review, targets.$reviewDetail);
      renderReviewDetailAdd(review, targets.$reviewDetail);
    },

    search(reviews, targets) {
      renderReviews(reviews, targets.$reviewList);
      renderMessage(reviews.length);
    },
  };
})();
