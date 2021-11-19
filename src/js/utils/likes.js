import axios from 'axios';
import user from '../user';

const handleLikesClick = async $target => {
  if (!user.isLoggedIn) {
    alert('로그인이 필요합니다.');
    return;
  }
  try {
    const { data: isliked } = await axios.patch('/reviews/review/likes', {
      curReviewId: $target.dataset.reviewid,
    });

    $target.querySelector('.likes__count').innerHTML =
      +$target.querySelector('.likes__count').innerHTML + (isliked ? 1 : -1);
    $target.querySelector('.likes-img').classList.toggle('hidden', !isliked);
    $target.querySelector('.unlikes-img').classList.toggle('hidden', isliked);
  } catch (e) {
    console.error(e);
  }
};
if (document.querySelector('.review__list')) {
  document.querySelector('.review__list').onclick = e => {
    if (!e.target.closest('.likes__button')) return;
    e.preventDefault();
    handleLikesClick(e.target.closest('.review__card'));
  };
}
if (document.querySelector('.reviewDetail')) {
  document.querySelector('.reviewDetail').onclick = e => {
    if (!e.target.closest('.likes__button')) return;
    handleLikesClick(e.target.closest('.reviewDetail__header'));
  };
}
