export default (() => {
  const renderReviews = ($target, reviewsData) => {
    $target.innerHtml = ``;
  };

  return {
    home($target, reviewsData) {
      this.renderReviews($target, reviewsData);
    },

    mypage() {
      // this.review();
    },

    reviewsData() {},
  };
})();
