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
    this.$target.className = `review-${initState.flexDirection}`;
    $app.appendChild(this.$target);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const { page } = this.state;

    this.$target.innerHTML = `
    <h2 class="a11y-hidden">리뷰 리스트</h2>
    <ul class="${page} review__list"></ul>`;
  }
}
