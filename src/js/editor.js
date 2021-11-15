import '../scss/index.scss';

import axios from 'axios';
import Quill from 'quill';
import rater from 'rater-js';

const $form = document.querySelector('form');

const quill = new Quill('.editor', {
  modules: {
    toolbar: [
      ['bold', 'italic'],
      ['link', 'blockquote', 'code-block', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  },
  placeholder: '내용을 입력하세요...',
  theme: 'snow',
});

const myRater = rater({
  element: document.querySelector('.info__rater'),
  step: 0.5,
  starSize: 24,
  rateCallback: (rating, done) => {
    myRater.setRating(rating);
    done();
  },
});

$form.addEventListener('submit', async e => {
  e.preventDefault();
  const postBody = {
    title: document.querySelector('#title').value,
    tags: [],
    content: quill.getContents(),
  };
  try {
    const { data } = await axios.post('/reviews', postBody);
  } catch (e) {
    console.error(e.message);
  }
});

document.querySelector('.load').addEventListener('click', async () => {
  try {
    const { data } = await axios.get('/reviews/5');
    const { title, content } = data;
    document.querySelector('#title').value = title;
    quill.setContents(content);
  } catch (e) {
    console.error(e.message);
  }
});
