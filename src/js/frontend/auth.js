const $signupWrapper = document.querySelector('.signup-wrapper');
const $signinWrapper = document.querySelector('.signin-wrapper');
const $login = document.querySelector('.login');
const $modalContainer = document.querySelector('.modal-container');

window.addEventListener('DOMContentLoaded', async () => {});

$modalContainer.addEventListener('click', e => {
  if (e.target.matches('.switch-auth-button')) {
    [$signupWrapper, $signinWrapper].forEach($wrapper => $wrapper.classList.toggle('hidden'));
    return;
  }
  if (!e.target.closest('.modal') || e.target.matches('.cancel-button')) {
    $modalContainer.classList.add('hidden');
  }
});
$login.addEventListener('click', () => {
  $modalContainer.classList.remove('hidden');
});
