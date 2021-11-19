import controller from './controller';
import './utils/authModal';

window.addEventListener('DOMContentLoaded', () => {
  controller.init('home');
});

document.querySelector('.nav__list').onclick = e => {
  controller.sortByNav('nav-main', e, 'home');
};

document.querySelector('.tags').onclick = e => {
  controller.sortByTag(e, 'home');
};
