import axios from 'axios';
import render from './render';

// DOM NODES
const $reviewList = document.querySelector('.review__list');
const $tagsList = document.querySelector('.tags__list');

window.addEventListener('DOMContentLoaded', async () => {
  const { order } = document.querySelector('.nav__now').dataset;
  try {
    const { data: reviews } = await axios.get(`/reviews/order-${order}`);
    const { data: curUserId } = await axios.get('/users/me');

    render.home(reviews, { $reviewList, $tagsList }, curUserId);
  } catch (e) {
    console.error(e);
  }
});

document.querySelector('.nav__list').onclick = async e => {
  e.preventDefault();

  document.querySelectorAll('.nav__list li').forEach($li => $li.classList.remove('nav__now'));
  e.target.closest('li').classList.add('nav__now');

  const { order } = e.target.closest('li').dataset;

  try {
    const { data: reviews } = await axios.get(`/reviews/order-${order}`);
    const { data: curUserId } = await axios.get('/users/me');

    render.home(reviews, { $reviewList, $tagsList }, curUserId);
  } catch (e) {
    console.error(e);
  }
};
window.onpopstate = e => {
  alert(`location: ${document.location}, state: ${JSON.stringify(e.state)}`);
};

// window.onpopstate = e => {
//   alert(`location: ${document.location}, state: ${JSON.stringify(e.state)}`);
// };
