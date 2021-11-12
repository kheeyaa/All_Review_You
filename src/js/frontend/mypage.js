import axios from 'axios';
import render from './render';
import userData from './userData';

// DOM NODES
const $reviewList = document.querySelector('.review__list');
const $tagsList = document.querySelector('.tags__list');

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const { data: reviews } = await axios.get('/reviews/mine/jkrang104');
    const { data: curUserId } = await axios.get('/users/me');

    userData.id = curUserId;
    render.mypage(reviews, { $reviewList, $tagsList }, curUserId);
  } catch (e) {
    console.error(e);
  }
});
