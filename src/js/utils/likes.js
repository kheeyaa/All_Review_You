import axios from 'axios';
import user from '../user';

document.querySelector('.review__list').onclick = async e => {
  if (!e.target.closest('.likes__button')) return;

  e.preventDefault();

  const $reviewCard = e.target.closest('.review__card');

  console.log(user.isLoggedIn, 'likes');

  if (!user.isLoggedIn) {
    alert('로그인이 필요합니다.');
    return;
  }

  try {
    const { data: isliked } = await axios.patch('/reviews/review/likes', {
      curReviewId: $reviewCard.dataset.reviewid,
    });

    $reviewCard.querySelector('.likes__count').innerHTML =
      +$reviewCard.querySelector('.likes__count').innerHTML + (isliked ? 1 : -1);
    $reviewCard.querySelector('.likes-img').classList.toggle('hidden', !isliked);
    $reviewCard.querySelector('.unlikes-img').classList.toggle('hidden', isliked);
  } catch (e) {
    console.error(e);
  }
};
