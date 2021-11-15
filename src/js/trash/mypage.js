import axios from 'axios';
import render from './render';
import userData from './userData';

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const { data: reviews } = await axios.get('/reviews/mine/jkrang104');
    const { data: curUserId } = await axios.get('/users/me');

    render.mypage(reviews);
  } catch (e) {
    console.error(e);
  }
});

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
