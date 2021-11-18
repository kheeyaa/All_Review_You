import axios from 'axios';
import Quill from 'quill';
import rater from 'rater-js';

let ratings = 0;
let thumbnail = '';

const $title = document.querySelector('.editor-title');
const $tagList = document.querySelector('.tag-list');
const $thumbnail = document.querySelector('.editor-thumbnail');
const $imgThumbnail = document.querySelector('.img-thumbnail');

const quill = new Quill('#quill', {
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
    ratings = rating;
    done();
  },
});

document.querySelector('.submit').addEventListener('click', async () => {
  if ($title.value.trim() === '') {
    alert('제목을 반드시 입력해주세요!');
    return;
  }
  const tags = [...$tagList.querySelectorAll('.tag')].map($tag => $tag.textContent.substring(1));
  const postBody = {
    title: $title.value.trim(),
    content: quill.getContents(),
    thumbnail,
    tags,
    ratings,
  };
  try {
    const { data } = await axios.post('/reviews', postBody);

    window.location.href = `/reviews/${data.reviewId}`;
  } catch (e) {
    console.error(e.message);
  }
});

$tagList.addEventListener('click', e => {
  const $tag = e.target.closest('.tag');
  if (!$tag) return;

  $tag.remove();
});

document.querySelector('.editor-tag').addEventListener('keydown', e => {
  if (e.isComposing || e.keyCode === 229) {
    return;
  }
  if (e.key !== 'Enter' || e.target.value.trim() === '') return;

  if ([...$tagList.querySelectorAll('.tag')].some($tag => $tag.textContent === `#${e.target.value.trim()}`)) {
    e.target.value = '';
    return;
  }

  const $li = document.createElement('li');
  $li.className = 'tag';
  $li.textContent = `#${e.target.value}`;
  $tagList.appendChild($li);

  e.target.value = '';
});

$thumbnail.addEventListener('change', async () => {
  const formData = new FormData();
  formData.append('thumbnail', $thumbnail.files[0]);
  try {
    const { data: url } = await axios.post('/reviews/picture', formData);
    thumbnail = url;
    $imgThumbnail.style.setProperty('background-image', `url(${url})`);
    $imgThumbnail.style.width = '200px';
    $imgThumbnail.style.height = '200px';
  } catch (e) {
    console.error(e.message);
  }
});

document.querySelector('.exit').addEventListener('click', () => {
  window.history.back();
});

// document.querySelector('.load').addEventListener('click', async () => {
//   try {
//     const { data } = await axios.get('/reviews/5');
//     const { title, content } = data;
//     document.querySelector('#title').value = title;
//     quill.setContents(content);
//   } catch (e) {
//     console.error(e.message);
//   }
// });
