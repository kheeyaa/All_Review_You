export default class Aside {
  constructor({ $app, initState }) {
    this.state = initState;

    this.$target = document.createElement('aside');
    this.$target.className = 'tags';
    $app.appendChild(this.$target);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = `
    <h2 class="tags__title">Tag List</h2>
    <ul class="tags__list">
      ${this.state.map(tag => `<li class="tag"><a href="" type="button">#${tag}</a></li>`).join('')}
    </ul>`;
  }
}
