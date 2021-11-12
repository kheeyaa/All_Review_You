import axios from 'axios';

let isLoggedIn = false;

const render = () => {
  document.querySelector('.login').classList.toggle('hidden', isLoggedIn);
  document.querySelector('.logout').classList.toggle('hidden', !isLoggedIn);
  document.querySelector('.my-page').classList.toggle('hidden', !isLoggedIn);
  document.querySelector('.new-review').classList.toggle('hidden', !isLoggedIn);
};

const setIsLoggedIn = nextIsLoggedIn => {
  isLoggedIn = nextIsLoggedIn;
  render();
};

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const { data: nextIsLoggedIn } = await axios.get('/users/me');
    setIsLoggedIn(nextIsLoggedIn);
  } catch (e) {
    console.error(e.message);
  }
});
