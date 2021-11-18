import axios from 'axios';
import render from './render';

export default class Observer {
  constructor(keyword = null) {
    this.options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.requestReviewsList(keyword);
        }
      });
    }, this.options);

    this.$reviewMoreText = document.querySelector('.review-more__text');
  }

  async requestReviewsList(keyword) {
    this.order = document.querySelector('.nav__now') ? document.querySelector('.nav__now').dataset.order : 'likes';

    this.$reviewMoreText.textContent = '잠시만 기다려주세요';
    try {
      const {
        data: { reviews },
      } = await axios.get('/reviews/sort', {
        params: {
          likesOrLatest: this.order,
          selectedTag: document.querySelector('.selectedTag')
            ? document.querySelector('.selectedTag').dataset.tag
            : null,
          keyword,
        },
      });

      reviews.length
        ? (this.$reviewMoreText.textContent = '리뷰 더보기')
        : (this.$reviewMoreText.textContent = '마지막 리뷰 입니다.');

      if (!reviews.length) return;

      render.addReviews(reviews);
    } catch (e) {
      console.error(e);
    }
  }

  start() {
    this.observer.observe(this.$reviewMoreText);
  }
}
