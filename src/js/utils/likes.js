import axios from 'axios';

document.querySelector('.review__list').onclick = async e => {
  if (!e.target.closest('.likes__button')) {
    return;
  }
  e.preventDefault();

  const { data: curUserId } = await axios.get('/users/me');

  const $reviewCard = e.target.closest('.review__card');

  if (!curUserId) {
    alert('로그인이 필요합니다.');
    return;
  }

  try {
    const { data: isliked } = await axios.patch('/reviews/review/likes', {
      curUserId,
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
