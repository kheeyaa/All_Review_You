import axios from 'axios';
import user from './user';
import render from './render';
import './utils/likes';
import './utils/authModal.js';

// DOM NODES
const $reviewDetail = document.querySelector('.reviewDetail');

const handleReveiwDetailManage = () => {
  document.querySelector('.reviewDatail__manage--remove').onclick = async () => {
    try {
      await axios.delete(window.location.pathname);
      alert('게시글이 삭제되었습니다.');
      window.location.href = `/`;
    } catch (e) {
      console.error(e);
    }
  };

  document.querySelector('.reviewDatail__manage--edit').onclick = () => {
    window.location.href = `/edit/${window.location.pathname.split('/')[2]}`;
  };
};

// 디테일 페이지 렌더
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const { data } = await axios.get(window.location.pathname);
    const [curReview, tagRelatedReviews] = data;

    const { data: curUserId } = await axios.get('/users/me');

    if (curUserId) user.login(curUserId);

    render.reviewDetail(curReview, tagRelatedReviews, { $reviewDetail });

    if (curReview.userId === curUserId) handleReveiwDetailManage(curReview);
  } catch (e) {
    console.error(e);
  }
});

// 댓글 추가
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

// 댓글 지우기
window.addEventListener('click', async e => {
  if (!e.target.classList.contains('reviewDetail__comments--delete')) return;
  const { data: curUserId } = await axios.get('/users/me');
  const commentUserId = e.target.previousElementSibling.previousElementSibling.textContent;
  const dataCommentId = e.target.closest('.reviewDetail__comments--items').dataset.commentid;

  if (commentUserId === curUserId) {
    const { data: reviews } = await axios.patch(window.location.pathname, {
      inReviewId: window.location.pathname.split('/')[2],
      dataCommentId,
      mode: 'delete',
    });
    render.addComments(reviews);
  }
});

// 댓글 수정 버튼 클릭
window.addEventListener('click', async e => {
  if (!e.target.classList.contains('reviewDetail__comments--update')) return;

  const { data: curUserId } = await axios.get('/users/me');
  const commentUserId = e.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

  if (commentUserId === curUserId) {
    const content = e.target.parentNode.querySelector('.reviewDetail__comments--content');
    const inputComment = e.target.parentNode.querySelector('.reviewDetail__comments--updateInput');
    content.classList.toggle('hidden');
    inputComment.classList.toggle('hidden');
    inputComment.value = content.textContent;
  }
});

// 댓글 수정 후 엔터
window.addEventListener('keyup', async e => {
  const inputComment = e.target.parentNode.querySelector('.reviewDetail__comments--updateInput');
  if (!inputComment) return;
  if (e.key === 'Enter') {
    const dataCommentId = e.target.closest('.reviewDetail__comments--items').dataset.commentid;
    const { data: reviews } = await axios.patch(window.location.pathname, {
      inReviewId: window.location.pathname.split('/')[2],
      dataCommentId,
      mode: 'edit',
      changedComment: inputComment.value,
    });
    render.addComments(reviews);
  }
});
