import Review from './Review';

export default class Main {
  constructor({ $app, initState }) {
    // new Main({
    //   $app: $searchWrap,
    //   initState: {
    //     page: 'main',
    //     flexDirection: 'column',
    //   },
    // })
    this.state = initState;

    this.$target = document.createElement('main');
    this.$target.className = `review-${this.state.flexDirection}`;
    this.$target.innerHTML = ` <h2 class="a11y-hidden">리뷰 리스트</h2>`;

    const $reviewList = document.createElement('ul');
    $reviewList.className = `${this.state.page} review__list`;

    this.$target.appendChild($reviewList);
    $app.appendChild(this.$target);

    this.$reviewList = document.querySelector('.review__list');
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    // map 을 써서 한 번에 하는 것으로 바꿔야 할 듯
    this.state.reviews.forEach(
      review =>
        new Review({
          $app: this.$reviewList,
          initState: {
            review,
            curUserId: this.state.curUserId,
            page: 'main',
          },
        })
    );
  }
}
