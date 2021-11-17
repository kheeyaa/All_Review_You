import axios from 'axios';
import render from './render';
import user from './user';
import Observer from './Observer';

window.addEventListener('DOMContentLoaded', async () => {
  // const { order } = document.querySelector('.nav__now').dataset;

  const order = 'likes';

  try {
    const reviewData = await Promise.all([
      axios.get(`/reviews/order-${order}`),
      axios.get('/users/me'),
      axios.patch(`/reviews/offset`),
    ]);

    const [{ data: reviews }, { data: curUserId }] = reviewData;

    if (curUserId) user.login(curUserId);

    // const observer = new Observer();
    // observer.start();

    render.home(reviews);
  } catch (e) {
    console.error(e);
  }
});
