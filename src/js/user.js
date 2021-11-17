export default (() => {
  let id = null;

  return {
    get id() {
      return id;
    },

    get isLoggedIn() {
      return !!id;
    },

    login(newId) {
      id = newId;
    },
  };
})();
