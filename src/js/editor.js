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
    if (!data.reviewId) {
      window.location.href = '/';
      alert('게시글 작성에 문제가 생겼습니다.');
      return;
    }

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
  if (e.key !== 'Enter' || e.target.value.trim() === '' || e.isComposing || e.keyCode === 229) return;

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
$imgThumbnail.addEventListener('click', () => {
  $thumbnail.click();
});

$thumbnail.addEventListener('change', async () => {
  const formData = new FormData();
  formData.append('thumbnail', $thumbnail.files[0]);
  try {
    const { data: url } = await axios.post('/reviews/picture', formData);
    thumbnail = url;
    $imgThumbnail.src = url;
    console.log(url);
  } catch (e) {
    alert('일시적인 오류로 사진 업로드를 실패했습니다.');
    console.error(e.message);
  }
});

document.querySelector('.exit').addEventListener('click', () => {
  window.history.back();
});
