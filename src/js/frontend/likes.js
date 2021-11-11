import axios from 'axios';

import userData from './userData';

document.querySelector('.review__list').onclick = async e => {
  if (e.target.closest('.likes__button')) {
    e.preventDefault();
  }

  if (!userData.id) {
    alert('로그인이 필요합니다.');
  }

  const { data: isliked } = await axios.patch('/reviews/review/likes', {
    curUserId: userData.id,
    curReviewId: e.target.closest('.review__card').dataset.reviewid,
  });

  document.querySelector('.likes-img').classList.toggle('hidden', !isliked);
  document.querySelector('.unlikes-img').classList.toggle('hidden', isliked);
};
