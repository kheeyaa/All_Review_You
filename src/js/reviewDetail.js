import axios from 'axios';
import user from './user';
import render from './render';

// DOM NODES
const $reviewDetail = document.querySelector('.reviewDetail');

window.addEventListener('DOMContentLoaded', async () => {
  try {
    // 리뷰 디테일 확인필요
    const { data } = await axios.get(window.location.pathname, {
      headers: { accept: 'application/json' },
    });
    const [curReview, tagRelatedReviews] = data;
    const { data: curUserId } = await axios.get('/users/me');

    if (curUserId) user.login(curUserId);

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
      inReviewId: window.location.pathname.split('/')[2], // 현재 접속한 reviewId 받아오기
      inUserId: curUserId, // 현재 접속한 userId 받아오기
      inContent: $reviewCommentInput.value,
    });
    render.addComments(reviews);
    $reviewCommentInput.value = '';
  }
});

window.addEventListener('click', async e => {
  if (!e.target.classList.contains('reviewDetail__comments--delete')) return;
  const { data: curUserId } = await axios.get('/users/me');
  const commentUserId = e.target.previousElementSibling.previousElementSibling.textContent;
  const dataCommentId = e.target.closest('.reviewDetail__comments--items').dataset.commentid;

  if (commentUserId === curUserId) {
    const { data: reviews } = await axios.patch(window.location.pathname, {
      inReviewId: window.location.pathname.split('/')[2],
      dataCommentId,
    });
    render.addComments(reviews);
  }
});

// TODO: 입력창 눌렀을 때 로그인 안되있으면 모달창 나오게
// window.addEventListener('click', async e => {
//   if (e.target !== document.querySelector('.reviewDetail__addComments--input')) return;
//   const { data: curUserId } = await axios.get('/users/me');
// });
