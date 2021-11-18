import controller from './controller';

window.addEventListener('DOMContentLoaded', controller.init);

['nav-main', 'nav-sub'].forEach(className => {
  document.querySelector(`.${className}`).onclick = e => {
    controller.sortByNav(className, e);
  };
});

document.querySelector('.tags').onclick = controller.sortByTag;

// window.onpopstate = controller.reload;
