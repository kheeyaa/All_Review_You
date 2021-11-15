export default class ReviewDetailRelatedReview {
  constructor({ $app }) {
    this.$target = document.createElement('section');
    this.$target.className = 'reviewDetail__relatedReview review-column-changewidth';
    $app.appendChild(this.$target);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = `
    <h2 class="reviewDetail__relatedReview--title">관련 있는 리뷰</h2>
    <div class="review-row review-column-changewidth">
      <ul class="review__list"></ul>
    </div>
    `;
  }
}
