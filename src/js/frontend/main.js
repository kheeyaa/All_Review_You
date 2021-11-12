import axios from 'axios';
import render from './render';
import userData from './userData';

// DOM NODES
const $reviewList = document.querySelector('.review__list');
const $tagsList = document.querySelector('.tags__list');

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const { data: reviews } = await axios.get('/reviews/all');
    const { data: curUserId } = await axios.get('/users/me');

    userData.id = curUserId;

    render.home(reviews, { $reviewList, $tagsList }, curUserId);
  } catch (e) {
    console.error(e);
  }
});

// console.log('main');

// document.querySelector('.router').onclick = async e => {
//   e.preventDefault();
//   const path = e.target.getAttribute('href');
//   console.log(path);
//   window.history.pushState({ path }, null, path);

//   try {
//     const { data } = await axios.get('/mypage');
//   } catch (e) {
//     console.error(e);
//   }
// };

window.onpopstate = e => {
  alert(`location: ${document.location}, state: ${JSON.stringify(e.state)}`);
};

// window.onpopstate = e => {
//   alert(`location: ${document.location}, state: ${JSON.stringify(e.state)}`);
// };
