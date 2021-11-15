import '../scss/index.scss';
import axios from 'axios';
import render from './render';
import MainPage from './pages/MainPage';
// import userData from './userData';

// const path = {
//   '/': 'home',
//   '/mypage': 'mypage',
//   '/reviews': 'reviewDetail',
//   '/search': 'search',
// };

const renderMessage = reviewsLen => {
  document.querySelector('.search__message').textContent = `총 ${reviewsLen}개의 리뷰를 찾았습니다.`;
};

const navigateToHome = async () => {
  const order = 1;
  const { data: reviews } = await axios.get('/reviews/all');
  const { data: curUserId } = await axios.get('/users/me');

  render.home(reviews, curUserId, order);
  window.scroll({ top: 0 });
};

const navigateToMyPage = async () => {
  const order = 1;
  const { data: reviews } = await axios.get('/reviews/all');
  const { data: curUserId } = await axios.get('/users/me');

  render.home(reviews, curUserId, order);
  window.scroll({ top: 0 });
};

const navigateToSearch = async () => {
  const order = 1;
  const { data: curUserId } = await axios.get('/users/me');

  render.search([], curUserId, order);
  window.scroll({ top: 0 });
};

const navigateToReviewDetail = async page => {
  const { data: reviews } = await axios.get(page, {
    headers: { accept: 'application/json' },
  });
  render.reviewDetail([reviews[0], reviews[1]]);
  window.scroll({ top: 0 });
};

const state = {
  curUserId: '',
};

window.addEventListener('DOMContentLoaded', async () => {
  const { pathname: page } = document.location;

  const path = page.match(/(^\/)|([a-z])/gi).join('');

  const { data: curUserId } = await axios.get('/users/me');
  state.curUserId = curUserId;

  const $container = document.querySelector('.container');
  path === '/reviews'
    ? navigateToReviewDetail(page)
    : path === '/mypage'
    ? navigateToMyPage()
    : path === '/search'
    ? navigateToSearch()
    : new MainPage({ $app: $container, initState: { curUserId: state.curUserId } });

  // path === '/reviews'
  //   ? navigateToReviewDetail(page)
  //   : path === '/mypage'
  //   ? navigateToMyPage()
  //   : path === '/search'
  //   ? navigateToSearch()
  //   : navigateToHome();

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

window.onclick = e => {
  if (!e.target.closest('a')) return;
  e.preventDefault();

  const $link = e.target.closest('a');

  const page = $link.getAttribute('href');

  window.history.pushState({ path: page }, null, page);

  const path = page.match(/(^\/)|([a-z])/gi).join('');

  const $container = document.querySelector('.container');
  path === '/reviews'
    ? navigateToReviewDetail(page)
    : path === '/mypage'
    ? navigateToMyPage()
    : path === '/search'
    ? navigateToSearch()
    : navigateToHome();
  // : new MainPage({ $app: $container, initState: { curUserId: state.curUserId } });

  // path === '/reviews'
  //   ? navigateToReviewDetail(page)
  //   : path === '/mypage'
  //   ? navigateToMyPage()
  //   : path === '/search'
  //   ? navigateToSearch()
  //   : navigateToHome();

  // try {
  //   // const { data: reviews } = await axios.get(page);
  //   // render[path[page.match(/(^\/)|([a-z])/gi).join('')]](reviews, curUserId, order);
  //   // window.scroll({ top: 0 });
  // } catch (e) {
  //   console.error(e);
  // }
};

window.onpopstate = () => {
  const { pathname: page } = document.location;

  const path = page.match(/(^\/)|([a-z])/gi).join('');

  const $container = document.querySelector('.container');
  path === '/reviews'
    ? navigateToReviewDetail(page)
    : path === '/mypage'
    ? navigateToMyPage()
    : path === '/search'
    ? navigateToSearch()
    : navigateToHome();
  // : new MainPage({ $app: $container, initState: { curUserId: state.curUserId } });

  // path === '/reviews'
  //   ? navigateToReviewDetail(page)
  //   : path === '/mypage'
  //   ? navigateToMyPage()
  //   : path === '/search'
  //   ? navigateToSearch()
  //   : navigateToHome();
};

window.onsubmit = async e => {
  e.preventDefault();

  if (!e.target.closest('.search__form')) return;

  const $searchInput = e.target.querySelector('input');

  try {
    const { data: reviews } = await axios.get(`/search`, {
      params: {
        keyword: $searchInput.value.trim(),
      },
    });
    const { data: curUserId } = await axios.get('/users/me');

    render.search(reviews, { $reviewList: document.querySelector('.review__list') }, curUserId);
    renderMessage(reviews.length);
  } catch (e) {
    console.error(e);
  }

  $searchInput.value = '';
};
