import axios from 'axios';
import render from './render';

// DOM NODES
const $reviewDetail = document.querySelector('.reviewDetail');

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const { data } = await axios.get(window.location.pathname, {
      headers: { accept: 'application/json' },
    });

    const [curReview, tagRelatedReviews] = data;
    const { data: curUserId } = await axios.get('/users/me');

    render.reviewDetail(curReview, tagRelatedReviews, { $reviewDetail }, curUserId);
  } catch (e) {
    console.error(e);
  }
});

window.addEventListener('submit', async e => {
  if (!document.querySelector('.reviewDetail__addComments--form')) return;
  e.preventDefault();

  const $reviewCommentInput = document.querySelector('.reviewDetail__addComments--input');

  const { data: curUserId } = await axios.get('/users/me');
  if (curUserId.length > 0) {
    const { data: reviews } = await axios.post(window.location.pathname, {
      params: {
        inReviewId: window.location.pathname.split('/')[2], // 현재 접속한 reviewId 받아오기
        inUserId: curUserId, // 현재 접속한 userId 받아오기
        inContent: $reviewCommentInput.value,
      },
    });
    render.addComments(reviews);
    $reviewCommentInput.value = '';
  }
});
