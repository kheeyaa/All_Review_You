import axios from 'axios';
import render from './render';

// DOM NODES
const $reviewList = document.querySelector('.review__list');
const $tagsList = document.querySelector('.tags__list');

const requestReviewsList = async () => {
  const { order } = document.querySelector('.nav__now').dataset;
  try {
    const reviewData = await Promise.all([axios.get(`/reviews/order-${order}`), axios.get('/users/me')]);
    const [{ data: reviews }, { data: curUserId }] = reviewData;

    if (reviews.length === 0) {
      document.querySelector('.review-more__text').innerHTML = '마지막 리뷰 입니다.';
    } else {
      document.querySelector('.review-more__text').innerHTML = '리뷰 더보기';
      render.addReviews(reviews, { $reviewList, $tagsList }, curUserId);
    }
  } catch (e) {
    console.error(e);
  }
};

const observeReviewMore = () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        requestReviewsList();
      }
    });
  }, options);

  const $reviewMoreText = document.querySelector('.review-more__text');
  observer.observe($reviewMoreText);
};

window.addEventListener('DOMContentLoaded', async () => {
  const { order } = document.querySelector('.nav__now').dataset;
  document.querySelector('.loading').classList.remove('hidden');
  document.querySelector('.review-more__text').classList.add('hidden');
  try {
    const reviewData = await Promise.all([
      axios.get(`/reviews/order-${order}`),
      axios.get('/users/me'),
      axios.patch(`/reviews/offset`),
    ]);
    document.querySelector('.loading').classList.add('hidden');
    document.querySelector('.review-more__text').classList.remove('hidden');

    const [{ data: reviews }, { data: curUserId }] = reviewData;

    render.home(reviews, { $reviewList, $tagsList }, curUserId);
    observeReviewMore();
  } catch (e) {
    console.error(e);
  }
});

document.querySelector('.nav__list').onclick = async e => {
  e.preventDefault();

  document.querySelector('.loading').classList.remove('hidden');
  document.querySelector('.review-more__text').classList.add('hidden');

  document.querySelectorAll('.nav__list li').forEach($li => $li.classList.remove('nav__now'));
  e.target.closest('li').classList.add('nav__now');

  const { order } = e.target.closest('li').dataset;

  try {
    const reviewData = await Promise.all([
      axios.get(`/reviews/order-${order}`),
      axios.get('/users/me'),
      axios.patch(`/reviews/offset`),
    ]);
    document.querySelector('.loading').classList.add('hidden');
    document.querySelector('.review-more__text').classList.remove('hidden');
    const [{ data: reviews }, { data: curUserId }] = reviewData;

    render.home(reviews, { $reviewList, $tagsList }, curUserId);
  } catch (e) {
    console.error(e);
  }
};
window.onpopstate = e => {
  alert(`location: ${document.location}, state: ${JSON.stringify(e.state)}`);
};
