import controller from './controller';

window.addEventListener('DOMContentLoaded', controller.init);

document.querySelector('.nav__list').onclick = e => {
  controller.sortByNav('nav-main', e);
};

document.querySelector('.tags').onclick = controller.sortByTag;

// window.onpopstate = async () => {
//   const path = window.location.pathname.replace(/\//g, '');

//   const order = path === 'latest' ? 'latest' : 'likes';

//   document.querySelectorAll('.nav__list > li').forEach($li => {
//     $li.classList.toggle('nav__now', $li.dataset.order === order);
//   });

//   try {
//     const { data: reviews } = await axios.get(`/reviews/order-${order}`);

//     render.home(reviews);
//   } catch (e) {
//     console.error(e);
//   }
// };
