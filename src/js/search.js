import axios from 'axios';
import render from './render';
import user from './user';
import Observer from './Observer';
import './utils/likes';
import './utils/authModal.js';

document.querySelector('.search__form').onsubmit = async e => {
  e.preventDefault();

  document.querySelector('.loading').classList.remove('hidden');
  document.querySelector('.review-more__text').classList.add('hidden');

  const $searchInput = e.target.querySelector('input');
  const keyword = $searchInput.value.trim();

  try {
    const reviewData = await Promise.all([
      axios.get('/reviews/sort', {
        params: { reset: 'reset', keyword },
      }),
      axios.get('/users/me'),
    ]);
    document.querySelector('.loading').classList.add('hidden');
    document.querySelector('.review-more__text').classList.remove('hidden');

    const [
      {
        data: { reviews, totalNum },
      },
      { data: curUserId },
    ] = reviewData;

    if (curUserId) user.login(curUserId);

    const observer = new Observer(keyword);
    observer.start();

    render.search(reviews, totalNum);
  } catch (e) {
    console.error(e);
  }

  $searchInput.value = '';
};
