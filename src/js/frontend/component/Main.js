export default class Main {
  constructor({ $app, initState }) {
    this.state = initState;

    this.$target = document.createElement('main');
    this.$target.className = 'review-row';
    $app.appendChild(this.$target);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const page = this.state;

    this.$target.innerHTML = `
    <h2 class="a11y-hidden">리뷰 리스트</h2>
    <ul class="${page} review__list"></ul>`;
  }
}
