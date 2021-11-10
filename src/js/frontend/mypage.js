import axios from 'axios';

const convertTime = date => {
  const [year, month, day] = date.toString().slice(0, 10).split('-');

  return `${year}년 ${month}월 ${day}일`;
};

const renderTemp = reviews => {
  console.log(reviews.flatMap(review => review.tags));

  document.querySelector('.mypage.review__list').innerHTML = reviews
    .map(
      ({ title, content, userId, likes, createdAt }) =>
        `<li class="mypage review__card">
          <div class="mypage review__img"><img src="../images/test.jpg" alt="" /></div>
          <div class="mypage review__details">
            <h2 class="mypage title">${title}</h2>
            <span class="mypage detail">${content}</span>
            <time class="mypage time" datetime="${createdAt.toString().slice(0, 10)}">
              ${convertTime(createdAt)}
            </time>
            <span class="mypage author">${userId}</span>
            <div class="mypage likes__container">
              <span class="mypage likes__count">${likes}</span>
              <button class="mypage likes__button">
                <img src="../images/like.png" class="mypage likes-img" aria-hidden="true" />
                <img src="../images/unlike.png" class="mypage unlikes-img hidden" aria-hidden="true" />
              </button>
            </div>
          </div>
        </li>`
    )
    .join('');
};

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const { data: reviews } = await axios.get('/reviews/1');

    renderTemp(reviews);
  } catch (e) {
    console.error(e);
  }
});
