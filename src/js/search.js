import axios from 'axios';
import render from './render';

document.querySelector('.search__form').onsubmit = async e => {
  e.preventDefault();

  const $searchInput = e.target.querySelector('input');

  try {
    const { data: reviews } = await axios.get(`/search`, {
      params: {
        keyword: $searchInput.value.trim(),
      },
    });
    const { data: curUserId } = await axios.get('/users/me');

    render.search(reviews, { $reviewList: document.querySelector('.review__list') }, curUserId);
  } catch (e) {
    console.error(e);
  }

  $searchInput.value = '';
};
