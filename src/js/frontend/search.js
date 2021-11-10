import axios from 'axios';
import render from './render';

const convertTime = date => {
  const [year, month, day] = date.toString().slice(0, 10).split('-');

  return `${year}년 ${month}월 ${day}일`;
};

const renderMessage = reviewsLen => {
  document.querySelector('.search__message').textContent = `총 ${reviewsLen}개의 리뷰를 찾았습니다.`;
};

const renderTemp = reviews => {
  renderMessage(reviews.length);
  document.querySelector('.review__list').innerHTML = reviews
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

document.querySelector('.search__form').onsubmit = async e => {
  e.preventDefault();

  const $searchInput = e.target.querySelector('input');

  try {
    const { data: reviews } = await axios.get(`/search`, {
      params: {
        keyword: $searchInput.value.trim(),
      },
    });
    renderTemp(reviews);
  } catch (e) {
    console.error(e);
  }

  $searchInput.value = '';
};
