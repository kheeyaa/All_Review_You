import controller from './controller';
import './utils/authModal.js';

window.addEventListener('DOMContentLoaded', controller.init);

document.querySelector('.nav__list').onclick = e => {
  controller.sortByNav('nav-main', e);
};

document.querySelector('.tags').onclick = controller.sortByTag;

window.onpopstate = e => controller.reload(e);
