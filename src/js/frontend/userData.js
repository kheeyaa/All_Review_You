export default (() => {
  let id = null;
  return {
    get id() {
      return id;
    },
    set id(newId) {
      id = newId;
    },
  };
})();
