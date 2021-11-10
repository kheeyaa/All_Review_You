import axios from 'axios';
import render from './render';

// DOM NODES
const $reviewList = document.querySelector('.review__list');
const $tagsList = document.querySelector('.tags__list');

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const { data: reviews } = await axios.get('/reviews/mine/jkrang104');

    render.mypage(reviews, { $reviewList, $tagsList });
  } catch (e) {
    console.error(e);
  }
});
