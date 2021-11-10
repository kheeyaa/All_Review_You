import axios from 'axios';
import render from './render';

// DOM NODES
const $reviewDetail = document.querySelector('.reviewDetail');

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const { data: reviews } = await axios.get('/reviews/review/1');

    render.reviewDetail(reviews[0], { $reviewDetail });
  } catch (e) {
    console.error(e);
  }
});
