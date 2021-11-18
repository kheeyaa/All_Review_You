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

  const fetchData = async (isDOMContentLoaded, params) => {
    try {
      const results = isDOMContentLoaded
        ? await Promise.all([axios.get('/reviews/sort', { params }), axios.get('/users/me')])
        : [await axios.get('/reviews/sort', { params })];

      const [{ reviews, tags }, curUserId] = results.map(result => result.data);

      return [reviews, tags, curUserId];
    } catch (e) {
      console.error(e);
    }
  };

  const manipulatePage = async (isDOMContentLoaded, params) => {
    const [likesOrLatest, mineOrFavorite] = [...document.querySelectorAll('.nav__now')].map($li => $li.dataset.order);

    const tag = document.querySelector('.selectedTag')?.dataset.tag;

    spinner(true);
    const [reviews, tags, curUserId] = await fetchData(isDOMContentLoaded, {
      ...params,
      filter: { likesOrLatest, mineOrFavorite },
    });
    spinner(false);

    if (isDOMContentLoaded && curUserId) user.login(curUserId);

    const observer = new Observer();
    observer.start();

    render.mypage(reviews, { tags, selectedTag: tag });
  };

  const createEndPoint = () =>
    [...document.querySelectorAll('.nav__now')]
      .map(({ dataset: { order } }) => (order === 'likes' || order === 'mine' ? '' : `/${order}`))
      .join('') + (document.querySelector('.selectedTag')?.dataset.tag.replace(/.+/g, match => `/tag=${match}`) ?? '');

  const pushHistory = () => {
    const endPoint = createEndPoint();
    const path = (window.location.pathname.match(/mypage/g) ? '/mypage' + endPoint : endPoint) || '/';

    const [likesOrLatest, mineOrFavorite] = [...document.querySelectorAll('.nav__now')].map($li => $li.dataset.order);

    const tag = document.querySelector('.selectedTag')?.dataset.tag;

    window.history.pushState({ likesOrLatest, mineOrFavorite, tag }, null, path);
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

      document.querySelector('.selectedTag')?.classList.remove('selectedTag');

      // pushHistory();

      manipulatePage(false, { reset: 'reset' });
    },

    sortByTag(e) {
      if (!e.target.matches('.tag a')) return;
      e.preventDefault();

      const $seletedTag = e.target.closest('.tag');

      [...document.querySelectorAll('.tag')].forEach($tag =>
        $tag.classList.toggle('selectedTag', $tag === $seletedTag)
      );

      // pushHistory();

      manipulatePage(false, { selectedTag: $seletedTag.dataset.tag, reset: 'reset' });
    },

    reload(e) {
      const {
        likesOrLatest,
        mineOrFavorite,
        tag: selectedTag,
      } = e.state
        ? e.state
        : window.location.pathname.match(/mypage/)
        ? { likesOrLatest: 'likes', mineOrFavorite: 'mine' }
        : { likesOrLatest: 'likes' };

      [...document.querySelectorAll('.nav-main li')].forEach($li => {
        $li.classList.toggle('nav__now', $li.dataset.order === likesOrLatest);
      });

      if (mineOrFavorite)
        [...document.querySelectorAll('.nav-sub li')].forEach($li => {
          $li.classList.toggle('nav__now', $li.dataset.order === mineOrFavorite);
        });

      [...document.querySelectorAll('.tag')].forEach($tag =>
        $tag.classList.toggle('selectedTag', $tag.dataset.tag === selectedTag)
      );

      manipulatePage(false, { selectedTag, reset: 'reset' });
    },
  };
})();
