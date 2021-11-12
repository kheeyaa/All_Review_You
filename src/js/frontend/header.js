// import axios from 'axios';

// import userData from './userData';

// let isLoggedIn = false;

// const render = () => {
//   document.querySelector('.login').classList.toggle('hidden', isLoggedIn);
//   document.querySelector('.logout').classList.toggle('hidden', !isLoggedIn);
//   document.querySelector('.my-page').classList.toggle('hidden', !isLoggedIn);
//   document.querySelector('.new-review').classList.toggle('hidden', !isLoggedIn);
// };

// const setIsLoggedIn = nextIsLoggedIn => {
//   isLoggedIn = nextIsLoggedIn;
//   render();
// };

// window.addEventListener('DOMContentLoaded', async () => {
//   try {
//     const { data: nextIsLoggedIn } = await axios.get('/users/me');
//     userData.id = nextIsLoggedIn;
//     setIsLoggedIn(nextIsLoggedIn);
//   } catch (e) {
//     console.error(e.message);
//   }
// });
export default class Header {
  constructor({ $app, initState }) {
    this.state = initState;

    this.$target = document.createElement('header');
    this.$target.className = 'header';
    $app.appendChild(this.$target);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const isLoggedIn = this.state;
    const logo = `
    <div class="header__logo">
      <h1 class="a11y-hidden">All Review You</h1>
      <a href="./index.html"><img src="../images/logo.png" class="logo" aria-hidden="true" /></a>
    </div>`;

    const userService = `
    <div class="header__user-service">
        <h2 class="a11y-hidden">사용자 서비스</h2>
        <a href="./search.html"><img src="../images/search.svg" alt="검색" /></a>
        <button class="login ${isLoggedIn ? 'hidden' : ''}"><img src="../images/login.svg" alt="로그인" /></button>
        <button class="logout ${isLoggedIn ? '' : 'hidden'}"><img src="../images/logout.svg" alt="로그아웃" /></button>
        <a class="my-page ${isLoggedIn ? '' : 'hidden'}"><img src="../images/mypage.svg" alt="마이 페이지" /></a>
        <a class="new-review ${
          isLoggedIn ? '' : 'hidden'
        }"><img src="../images/newReview.svg" alt="새 리뷰 올리기" /></a>
    </div>`;

    this.$target.innerHTML = logo + userService;
  }
}
