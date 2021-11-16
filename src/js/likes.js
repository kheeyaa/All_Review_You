import axios from 'axios';
import userData from './utils/userData';

document.querySelector('.review__list').onclick = e => {
  if (e.target.closest('.likes__button')) {
    e.preventDefault();
  }

  userData.id = 'hello';
  console.log('hello? ');

  console.log('likes.js > ', userData.id);
  // if (!userData.id) {
  //   alert('로그인이 필요합니다.');
  //   return;
  // }

  // const { data: isliked } = await axios.patch('/reviews/review/likes', {
  //   curUserId: userData.id,
  //   curReviewId: e.target.closest('.review__card').dataset.reviewid,
  // });

  // document.querySelector('.likes-img').classList.toggle('hidden', !isliked);
  // document.querySelector('.unlikes-img').classList.toggle('hidden', isliked);
};
