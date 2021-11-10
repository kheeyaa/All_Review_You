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
    render.search(reviews, { $reviewList: document.querySelector('.review__list') });
  } catch (e) {
    console.error(e);
  }

  $searchInput.value = '';
};
