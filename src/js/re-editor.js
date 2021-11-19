import axios from 'axios';
import Quill from 'quill';
import rater from 'rater-js';

let ratings = 0;
let thumbnail = '';

const $title = document.querySelector('.editor-title');
const $tagList = document.querySelector('.tag-list');
const $thumbnail = document.querySelector('.editor-thumbnail');
const $imgThumbnail = document.querySelector('.img-thumbnail');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const { data: review } = await axios.get(window.location.pathname);
    const {
      comments,
      content: curContent,
      ratings: curRatings,
      reviewId: curReviewId,
      tags: curTags,
      thumbnail: curThumbnail,
      title: curTitle,
      createdAt,
      likes,
    } = review;

    $title.value = curTitle;
    const $lis = document.createDocumentFragment();
    curTags.forEach($tag => {
      const $li = document.createElement('li');
      $li.className = 'tag';
      $li.innerHTML = '#' + $tag;
      $lis.appendChild($li);
    });
    $tagList.appendChild($lis);
    // $thumbnail.value = curThumbnail; // => 정책상 안됨...
    if (curThumbnail) $imgThumbnail.src = curThumbnail;

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
    quill.setContents(curContent);

    const myRater = rater({
      element: document.querySelector('.info__rater'),
      rating: curRatings,
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
        comments,
        title: $title.value.trim(),
        reviewId: curReviewId,
        content: quill.getContents(),
        thumbnail: thumbnail || curThumbnail,
        tags,
        ratings,
        createdAt,
        likes,
      };
      try {
        const { data } = await axios.post(window.location.pathname, postBody);

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

    document.querySelector('.editor-tag').addEventListener('keyup', e => {
      if (e.key !== 'Enter' || e.target.value.trim() === '') return;

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
        const img = document.createElement('img');
        img.src = url;
        img.onload = () => {
          $imgThumbnail.src = url;
        };
        img.onerror = () => {
          img.src = url;
        };
      } catch (e) {
        alert('일시적인 오류로 사진 업로드를 실패했습니다.');
        console.error(e.message);
      }
    });

    document.querySelector('.exit').addEventListener('click', () => {
      window.history.back();
    });
  } catch (e) {
    console.error(e);
  }
});
