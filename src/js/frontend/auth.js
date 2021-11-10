import axios from 'axios';

let isLoggedIn = false;

const $login = document.querySelector('.login');
const $logout = document.querySelector('.logout');
const $signupWrapper = document.querySelector('.signup-wrapper');
const $signinWrapper = document.querySelector('.signin-wrapper');
const $modalContainer = document.querySelector('.modal-container');

const render = () => {
  $login.classList.toggle('hidden', isLoggedIn);
  $logout.classList.toggle('hidden', !isLoggedIn);
  document.querySelector('.my-page').classList.toggle('hidden', !isLoggedIn);
  document.querySelector('.new-review').classList.toggle('hidden', !isLoggedIn);
};

const setIsLoggedIn = newIsLoggedIn => {
  isLoggedIn = newIsLoggedIn;
  render();
};

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const { data } = await axios.get('/users/me');
    setIsLoggedIn(data);
  } catch (e) {
    console.error(e.message);
  }
});

$login.addEventListener('click', () => {
  $modalContainer.classList.remove('hidden');
});

$logout.addEventListener('click', async () => {
  await axios.post('/auth/logout');
  setIsLoggedIn(false);
});

$modalContainer.addEventListener('click', e => {
  if (e.target.matches('.switch-auth-button')) {
    [$signupWrapper, $signinWrapper].forEach($wrapper => $wrapper.classList.toggle('hidden'));
    return;
  }
  if (!e.target.closest('.modal') || e.target.matches('.cancel-button')) {
    $modalContainer.classList.add('hidden');
  }
});
