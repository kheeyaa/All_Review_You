import axios from 'axios';
import user from './user';
import render from './render';
import './utils/likes';

// DOM NODES
const $reviewDetail = document.querySelector('.reviewDetail');

const handleReveiwDetailManage = () => {
  document.querySelector('.reviewDatail__manage--remove').onclick = async () => {
    await axios.delete(window.location.pathname);
    alert('게시글이 삭제되었습니다.');
    window.location.href = `/index.html/`;
  };
};

window.addEventListener('DOMContentLoaded', async () => {
  try {
    // 리뷰 디테일 확인필요
    const { data } = await axios.get(window.location.pathname, {
      headers: { accept: 'application/json' },
    });
    const [curReview, tagRelatedReviews] = data;
    const { data: curUserId } = await axios.get('/users/me');

    if (curUserId) user.login(curUserId);

    render.reviewDetail(curReview, tagRelatedReviews, { $reviewDetail });

    if (curReview.userId === curUserId) handleReveiwDetailManage();
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

// TODO: 입력창 눌렀을 때 로그인 안되있으면 모달창 나오게
// window.addEventListener('click', async e => {
//   if (e.target !== document.querySelector('.reviewDetail__addComments--input')) return;
//   const { data: curUserId } = await axios.get('/users/me');
// });
