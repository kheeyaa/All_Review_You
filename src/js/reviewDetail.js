import '../scss/index.scss';
import axios from 'axios';
import render from './render';
import userData from './utils/userData';

// DOM NODES
const $reviewDetail = document.querySelector('.reviewDetail');

window.addEventListener('DOMContentLoaded', async () => {
  console.log('hi');

  try {
    const {
      data: [curReview, tagRelatedReviews],
    } = await axios.get('/reviews/review/2');
    console.log(curReview, tagRelatedReviews);
    const { data: curUserId } = await axios.get('/users/me');

    userData.id = curUserId;

    render.reviewDetail(curReview, tagRelatedReviews, { $reviewDetail }, curUserId);
  } catch (e) {
    console.error(e);
  }
});

// window.addEventListener('submit', async e => {
//   if (!document.querySelector('.reviewDetail__addComments--form')) return;
//   e.preventDefault();

//   const $reviewCommentInput = document.querySelector('.reviewDetail__addComments--input');

//   const { data: reviews } = await axios.post('/reviews/review/1', {
//     params: {
//       inReviewId: 1, // 현재 접속한 reviewId 받아오기
//       inUserId: 'ptj', // 현재 접속한 userId 받아오기
//       inContent: $reviewCommentInput.value,
//     },
//   });

//   render.addComments(reviews[0], { $reviewDetail });
// });
