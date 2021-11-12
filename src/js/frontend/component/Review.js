import utils from '../utils';

export default class Review {
  constructor({ $app, initState }) {
    this.state = initState;

    this.$target = document.createElement('li');
    this.$target.className = `${this.state.page} review__card`;
    this.$target.dataset.reviewid = this.state.review.reviewId;
    $app.appendChild(this.$target);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const { page, review, curUserId } = this.state;

    const isOneself = review.likes.includes(curUserId);

    this.$target.innerHTML = `
    <a href="/reviews/${review.reviewId}">
      <div class="${page} review__img">
        <img src="../images/test.jpg" alt="" />
      </div>
      <div class="${page} review__details">
        <h2 class="${page} title">${review.title}</h2>
        <span class="${page} detail">${review.content}</span>
        <time class="${page} time" datetime="${review.createdAt.toString().slice(0, 10)}">
          ${utils.convertTimeFormat(review.createdAt)}
        </time>
        <span class="${page} author">${review.userId}</span>
        <div class="${page} likes__container">
          <span class="${page} likes__count">${review.likes.length}</span>
          <button class="${page} likes__button">
            <img src="../images/like.png" class="${page} likes-img ${isOneself ? '' : 'hidden'}" aria-hidden="true" />
            <img src="../images/unlike.png" 
              class="${page} unlikes-img ${isOneself ? 'hidden' : ''}" aria-hidden="true" />
          </button>
        </div>
        <div class="${page} rater__wrap"><div id="rater"></div></div>
      </div>
    </a>`;
  }
}
