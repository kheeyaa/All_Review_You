export default class Nav {
  constructor({ $app, initState }) {
    this.state = initState;

    this.$target = document.createElement('nav');
    this.$target.className = `nav-${this.state.navClassName}`;
    $app.appendChild(this.$target);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const { menuList } = this.state;

    this.$target.innerHTML = `
    <ul class="nav__list">
      <h2 class="a11y-hidden">${this.state.navClassName === 'main' ? '메인' : '서브'} 메뉴</h2>
      ${menuList
        .map(
          (menu, i) => `
      <li class="${i === 0 ? 'nav__now' : ''}">
        <a href="/${menu}">${menu}</a>
      </li>`
        )
        .join('')}
    </ul>`;
  }
}
