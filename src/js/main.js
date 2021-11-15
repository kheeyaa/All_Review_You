import axios from 'axios';
import render from './render';
import userData from './userData';

// const path = {
//   '/': 'home',
//   '/mypage': 'mypage',
//   '/reviews': 'reviewDetail',
//   '/search': 'search',
// };

window.addEventListener('DOMContentLoaded', async () => {
  const { pathname: page } = document.location;

  console.log(page);

  const path = page.match(/(^\/)|([a-z])/gi).join('');

  if (path === '/') {
    const order = 1;
    const { data: reviews } = await axios.get('/reviews/all');
    const { data: curUserId } = await axios.get('/users/me');

    render.home(reviews, curUserId, order);
    window.scroll({ top: 0 });
  } else if (path === '/mypage') {
    const order = 1;
    const { data: reviews } = await axios.get('/reviews/all');
    const { data: curUserId } = await axios.get('/users/me');

    render.home(reviews, curUserId, order);
    window.scroll({ top: 0 });
  } else {
    const { data: reviews } = await axios.get(page, {
      headers: { accept: 'application/json' },
    });
    render.reviewDetail(reviews);
    window.scroll({ top: 0 });
  }

  // const { order } = document.querySelector('.nav__now').dataset;
  // try {
  //   const order = 1;
  //   const { data: reviews } = await axios.get('/reviews/all');
  //   const { data: curUserId } = await axios.get('/users/me');

  //   render.home(reviews, curUserId, order);
  // } catch (e) {
  //   console.error(e);
  // }
});

// document.querySelector('.nav__list').onclick = async e => {
//   e.preventDefault();

//   document.querySelectorAll('.nav__list li').forEach($li => $li.classList.remove('nav__now'));
//   e.target.closest('li').classList.add('nav__now');

//   const { order } = e.target.closest('li').dataset;

//   try {
// const { data: reviews } = await axios.get('/reviews/all');
// const { data: curUserId } = await axios.get('/users/me');

//     userData.id = curUserId;

//     render.home(reviews, { $reviewList, $tagsList }, curUserId, order);
//   } catch (e) {
//     console.error(e);
//   }
// };

window.onclick = async e => {
  if (!e.target.closest('a')) return;
  e.preventDefault();

  const $link = e.target.closest('a');
  const page = $link.getAttribute('href');

  window.history.pushState({ path: page }, null, page);

  const path = page.match(/(^\/)|([a-z])/gi).join('');

  if (path === '/') {
    const order = 1;
    const { data: reviews } = await axios.get('/reviews/all');
    const { data: curUserId } = await axios.get('/users/me');

    render.home(reviews, curUserId, order);
    window.scroll({ top: 0 });
  } else if (path === '/mypage') {
    const order = 1;
    const { data: reviews } = await axios.get('/reviews/all');
    const { data: curUserId } = await axios.get('/users/me');

    render.home(reviews, curUserId, order);
    window.scroll({ top: 0 });
  } else {
    const { data: reviews } = await axios.get(page, {
      headers: { accept: 'application/json' },
    });
    render.reviewDetail(reviews);
    window.scroll({ top: 0 });
  }

  // try {
  //   // const { data: reviews } = await axios.get(page);
  //   // render[path[page.match(/(^\/)|([a-z])/gi).join('')]](reviews, curUserId, order);
  //   // window.scroll({ top: 0 });
  // } catch (e) {
  //   console.error(e);
  // }
};

window.onpopstate = async () => {
  const { pathname: page } = document.location;

  const path = page.match(/(^\/)|([a-z])/gi).join('');

  if (path === '/') {
    const order = 1;
    const { data: reviews } = await axios.get('/reviews/all');
    const { data: curUserId } = await axios.get('/users/me');

    render.home(reviews, curUserId, order);
    window.scroll({ top: 0 });
  } else if (path === '/mypage') {
    const order = 1;
    const { data: reviews } = await axios.get('/reviews/all');
    const { data: curUserId } = await axios.get('/users/me');

    render.home(reviews, curUserId, order);
    window.scroll({ top: 0 });
  } else {
    const { data: reviews } = await axios.get(page, {
      headers: { accept: 'application/json' },
    });
    render.reviewDetail(reviews);
    window.scroll({ top: 0 });
  }
};
