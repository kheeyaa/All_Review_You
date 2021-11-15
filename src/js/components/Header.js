export default class Header {
  constructor({ $app, initState }) {
    this.state = initState;
    // new Header({
    //   $app: $container,
    //   initState: {
    //     curUserId,
    //     curPage: 'search',
    //   },
    // })

    if (this.state.curPage === 'search') this.state.curPage = 'header-' + this.state.curPage;

    this.$target = document.createElement('header');
    this.$target.className = `header ${this.state.curPage}`;
    $app.appendChild(this.$target);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const isLoggedIn = this.state.curUserId;
    const logo = `
    <div class="header__logo">
      <h1 class="a11y-hidden">All Review You</h1>
      <a href="/"><img src="../images/logo.png" class="logo" aria-hidden="true" /></a>
    </div>`;

    const userService = `
    <div class="header__user-service">
      <h2 class="a11y-hidden">사용자 서비스</h2>
      <a href="/search"><img src="../images/search.svg" alt="검색" /></a>
      <button class="login ${isLoggedIn ? 'hidden' : ''}">
        <img src="../images/login.svg" alt="로그인" />
      </button>
      <button class="logout ${isLoggedIn ? '' : 'hidden'}">
        <img src="../images/logout.svg" alt="로그아웃" />
      </button>
      <a href="/mypage" class="my-page ${isLoggedIn ? '' : 'hidden'}">
        <img src="../images/mypage.svg" alt="마이 페이지" />
      </a>
      <a href="/write" class="new-review ${isLoggedIn ? '' : 'hidden'}">
        <img src="../images/newReview.svg" alt="새 리뷰 올리기" />
      </a>
    </div>`;

    this.$target.innerHTML = logo + userService;
  }
}
