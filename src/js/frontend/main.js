import axios from 'axios';

console.log('main');

// document.querySelector('.router').onclick = async e => {
//   e.preventDefault();
//   const path = e.target.getAttribute('href');
//   console.log(path);
//   window.history.pushState({ path }, null, path);

//   try {
//     const { data } = await axios.get('/mypage');
//   } catch (e) {
//     console.error(e);
//   }
// };

window.onpopstate = e => {
  alert(`location: ${document.location}, state: ${JSON.stringify(e.state)}`);
};
