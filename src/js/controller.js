import axios from 'axios';
import render from './render';
import user from './user';
import Observer from './Observer';
import './utils/likes';

export default (() => {
  const spinner = isOn => {
    ['loading', 'review-more__text'].forEach((className, idx) =>
      document.querySelector(`.${className}`).classList.toggle('hidden', idx === (isOn ? 1 : 0))
    );
  };

  const fetchData = async (isInitFetch, params) => {
    try {
      const results = isInitFetch
        ? await Promise.all([axios.get('/reviews/sort', { params }), axios.get('/users/me')])
        : [await axios.get('/reviews/sort', { params })];

      const [{ reviews, tags }, curUserId] = results.map(result => result.data);

      return [reviews, tags, curUserId];
    } catch (e) {
      console.error(e);
    }
  };

  const manipulatePage = async (isInitFetch, params) => {
    const [likesOrLatest, mineOrFavorite] = [...document.querySelectorAll('.nav__now')].map($li => $li.dataset.order);

    const tag = document.querySelector('.selectedTag')?.dataset.tag;

    spinner(true);
    const [reviews, tags, curUserId] = await fetchData(isInitFetch, {
      ...params,
      filter: { likesOrLatest, mineOrFavorite },
    });
    spinner(false);

    if (isInitFetch && curUserId) user.login(curUserId);

    const observer = new Observer();
    observer.start();

    render.mypage(reviews, { tags, selectedTag: tag });
  };

  return {
    init() {
      manipulatePage(true, { reset: 'reset' });
    },

    sortByNav(className, e) {
      if (!e.target.matches('.nav__list a')) return;
      e.preventDefault();

      [...document.querySelectorAll(`.${className} li`)].forEach($li => {
        $li.classList.toggle('nav__now', $li === e.target.parentNode);
      });

      manipulatePage(false, { reset: 'reset' });
    },

    sortByTag(e) {
      if (!e.target.matches('.tag a')) return;
      e.preventDefault();

      const $seletedTag = e.target.closest('.tag');

      [...document.querySelectorAll('.tag')].forEach($tag =>
        $tag.classList.toggle('selectedTag', $tag === $seletedTag)
      );

      manipulatePage(false, { selectedTag: $seletedTag.dataset.tag, reset: 'reset' });
    },
  };
})();
