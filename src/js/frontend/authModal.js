import axios from 'axios';
import { signupSchema, errorMessage } from './utils/validSchema.js';

let schema = signupSchema;

const $login = document.querySelector('.login');
const $logout = document.querySelector('.logout');
const $modalContainer = document.querySelector('.modal-container');
const $signupWrapper = document.querySelector('.signup-wrapper');
const $signupForm = document.querySelector('.signup');
const $signinWrapper = document.querySelector('.signin-wrapper');
const $signinForm = document.querySelector('.signin');

const resetModalContent = () => {
  [...$modalContainer.querySelectorAll('input')].forEach($input => {
    $input.value = '';
  });
  [...$modalContainer.querySelectorAll('.error-message')].forEach($errorMessage => {
    $errorMessage.textContent = '';
  });
  $modalContainer.querySelector('.signup-button').disabled = true;

  schema = signupSchema;
};

const checkSignupValid = () => {
  [...$signupForm.querySelectorAll('input')].forEach($input => {
    const { name, value } = $input;
    schema[name].value = value;
    const $errorMessage = $input.parentNode.querySelector('.error-message');
    if ($input.value !== '') $errorMessage.textContent = schema[name].isValid ? '' : schema[name].error;
  });
  document.querySelector('.submit-button').disabled = !schema.isValid;
};

$login.addEventListener('click', () => {
  $modalContainer.classList.remove('hidden');
  $signinWrapper.classList.remove('hidden');
  $signupWrapper.classList.add('hidden');
});

$logout.addEventListener('click', async () => {
  try {
    await axios.post('/auth/logout');
    window.location.href = window.location.pathname;
  } catch (e) {
    console.error(e.message);
  }
});

$modalContainer.addEventListener('click', e => {
  if (e.target.matches('.switch-auth-button')) {
    [$signupWrapper, $signinWrapper].forEach($wrapper => {
      $wrapper.classList.toggle('hidden');
    });
    resetModalContent();
    return;
  }

  if (!e.target.closest('.modal') || e.target.closest('.cancel-button')) {
    resetModalContent();
    $modalContainer.classList.add('hidden');
  }
});

$signupForm.addEventListener('input', () => {
  checkSignupValid();
});

[$signinForm, $signupForm].forEach($form => {
  $form.addEventListener('submit', async e => {
    e.preventDefault();

    const inputs = $form.querySelectorAll('input');
    const postBody = [...inputs].reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), {});
    try {
      await axios.post(`/auth/${$form.className}`, postBody);
      window.location.href = window.location.pathname;
    } catch (e) {
      console.log('hi');
      $form.querySelector('.error-result').textContent = errorMessage[$form.className];
    }
  });
});
