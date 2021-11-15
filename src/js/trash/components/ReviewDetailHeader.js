import utils from '../utils';

export default class ReviewDetailHeader {
  constructor({ $app, initState }) {
    this.state = initState;

    this.$target = document.createElement('div');
    this.$target.className = 'reviewDetail__contentWrap';
    $app.appendChild(this.$target);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const { review, curUserId } = this.state;

    const isOneself = review.likes.includes(curUserId);

    this.$target.innerHTML = `
    <h2 class="a11y-hidden">리뷰</h2>
    <header class="reviewDetail__header" data-reviewid = "${review.reviewId}">
      <h3 class="a11y-hidden">리뷰-제목</h3>
      <p class="reviewDetail__title">${review.title}</p>
      <div class="reviewDetail__informWrap">
        <div class="reviewDetail__inform">
          <span class="reviewDetail__inform--userid">${review.userId}</span
          ><span class="reviewDetail__inform--beforeDay">${utils.calculateElaspedTime(review.createdAt)}</span>
          <div class="reviewDetail__inform--tag">
            ${review.tags.map(tag => `<span class="reviewDetail__inform--tag--text"># ${tag}</span>`).join('')}
          </div>
        </div>
        <div class="reviewDetail__addInform">
          <div class="reviewDetail__addInform--ratingWrap">
            <span class="reviewDetail__addInform--ratingText">Ratings</span>
            <div class="reviewDetail__addInform--starsWrap">
              <span class="reviewDetail__addInform--starsCount">${review.ratings}</span>
              <div class="reviewDetail__addInform--stars"><div id="rater"></div></div>
            </div>
          </div>
          <div class="reviewDetail__addInform--likesWrap">
            <span class="reviewDetail__addInform--likesText">likes</span>
            <div class="reviewDetail__addInform--likesSubWrap">
              <span class="reviewDetail__addInform--likesCount likes__count">${review.likes.length}</span>
              <button class="likes__button">
                <img src="../images/like.png" class="likes-img ${isOneself ? '' : 'hidden'}" aria-hidden="true" />
                <img src="../images/unlike.png" class="unlikes-img ${isOneself ? 'hidden' : ''}" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>`;
  }
}
