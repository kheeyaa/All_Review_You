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
    userData.id = curUserId;
    render.reviewDetail(curReview, tagRelatedReviews, { $reviewDetail }, curUserId);
  } catch (e) {
    console.error(e);
  }
  // try {
  //   const {
  //     data: [curReview, tagRelatedReviews],
  //   } = await axios.get(window.location.pathname);
  //   console.log(curReview, tagRelatedReviews);
  //   const { data: curUserId } = await axios.get('/users/me');
  //   userData.id = curUserId;
  //   render.reviewDetail(curReview, tagRelatedReviews, { $reviewDetail }, curUserId);
  // } catch (e) {
  //   console.error(e);
  // }
});

window.addEventListener('submit', async e => {
  if (!document.querySelector('.reviewDetail__addComments--form')) return;
  e.preventDefault();

  const $reviewCommentInput = document.querySelector('.reviewDetail__addComments--input');

  const { data: reviews } = await axios.post('/reviews/2', {
    params: {
      inReviewId: 1, // 현재 접속한 reviewId 받아오기
      inUserId: 'ptj', // 현재 접속한 userId 받아오기
      inContent: $reviewCommentInput.value,
    },
  });

  render.addComments(reviews, { $reviewDetail });
});
