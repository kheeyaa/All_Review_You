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
    const [likesOrLatest, mineOrFavorite] = [...document.querySelectorAll('.nav__now')].map($li => $li.dataset.order);

    this.$reviewMoreText.textContent = '잠시만 기다려주세요';
    try {
      const {
        data: { reviews },
      } = await axios.get('/reviews/sort', {
        params: {
          filter: { likesOrLatest, mineOrFavorite },
          selectedTag: document.querySelector('.selectedTag')?.dataset.tag,
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
