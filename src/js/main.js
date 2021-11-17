import axios from 'axios';
import render from './render';
import user from './user';
import Observer from './Observer';
import './utils/likes';

window.addEventListener('DOMContentLoaded', async () => {
  const { order } = document.querySelector('.nav__now').dataset;

  try {
    const reviewData = await Promise.all([
      axios.get('/reviews/sort', {
        params: { likesOrLatest: order, reset: 'reset' },
      }),
      axios.get('/users/me'),
    ]);

    const [{ data: reviews }, { data: curUserId }] = reviewData;

    if (curUserId) user.login(curUserId);

    const observer = new Observer();
    observer.start();

    render.home(reviews);
  } catch (e) {
    console.error(e);
  }
});

document.querySelector('.nav__list').onclick = async e => {
  if (!e.target.matches('.nav__list a')) return;
  e.preventDefault();

  document.querySelectorAll('.nav__list > li').forEach($li => {
    $li.classList.toggle('nav__now', $li === e.target.parentNode);
  });

  const { order } = e.target.parentNode.dataset;

  // window.history.pushState({ path: order }, null, order);

  try {
    const { data: reviews } = await axios.get('/reviews/sort', {
      params: { likesOrLatest: order, reset: 'reset' },
    });

    render.home(reviews);
  } catch (e) {
    console.error(e);
  }
};

// window.onpopstate = async () => {
//   const path = window.location.pathname.replace(/\//g, '');

//   const order = path === 'latest' ? 'latest' : 'likes';

//   document.querySelectorAll('.nav__list > li').forEach($li => {
//     $li.classList.toggle('nav__now', $li.dataset.order === order);
//   });

//   try {
//     const { data: reviews } = await axios.get(`/reviews/order-${order}`);

//     render.home(reviews);
//   } catch (e) {
//     console.error(e);
//   }
// };
