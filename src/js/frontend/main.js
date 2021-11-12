import axios from 'axios';
import render from './render';
import userData from './userData';

window.addEventListener('DOMContentLoaded', async () => {
  // const { order } = document.querySelector('.nav__now').dataset;
  try {
    const order = 1;
    const { data: reviews } = await axios.get('/reviews/all');
    const { data: curUserId } = await axios.get('/users/me');

    render.home(reviews, curUserId, order);
  } catch (e) {
    console.error(e);
  }
});

// document.querySelector('.nav__list').onclick = async e => {
//   e.preventDefault();

//   document.querySelectorAll('.nav__list li').forEach($li => $li.classList.remove('nav__now'));
//   e.target.closest('li').classList.add('nav__now');

//   const { order } = e.target.closest('li').dataset;

//   try {
//     const { data: reviews } = await axios.get('/reviews/all');
//     const { data: curUserId } = await axios.get('/users/me');

//     userData.id = curUserId;

//     render.home(reviews, { $reviewList, $tagsList }, curUserId, order);
//   } catch (e) {
//     console.error(e);
//   }
// };

window.onclick = async e => {
  if (!e.target.closest('a')) return;
  e.preventDefault();

  try {
    const $link = e.target.closest('a');
    const page = $link.getAttribute('href');
    const { reviewid } = $link.parentNode.dataset;

    window.history.pushState(null, null, page + `/${reviewid}`);

    const { data: review } = await axios.get(page + `/${reviewid}`);

    render.reviewDetail(review[0]);
    window.scroll({ top: 0 });
  } catch (e) {
    console.error(e);
  }
};

window.onpopstate = async () => {
  const { pathname } = document.location;

  if (pathname.match(/[reviews]/)) {
    const { data: review } = await axios.get(pathname);
    const { data: curUserId } = await axios.get('/users/me');
    render.reviewDetail(review[0], curUserId);
    window.scroll({ top: 0 });
  } else {
    const order = 1;
    const { data: reviews } = await axios.get('/reviews/all');
    const { data: curUserId } = await axios.get('/users/me');

    render.home(reviews, curUserId, order);
  }
};

// window.onpopstate = e => {
//   alert(`location: ${document.location}, state: ${JSON.stringify(e.state)}`);
// };
