import controller from './controller';

window.addEventListener('DOMContentLoaded', () => {
  controller.init('mypage');
});

['nav-main', 'nav-sub'].forEach(className => {
  document.querySelector(`.${className}`).onclick = e => {
    controller.sortByNav(className, e, 'mypage');
  };
});
