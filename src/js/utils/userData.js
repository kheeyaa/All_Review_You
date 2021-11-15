export default (() => {
  let id = null;
  return {
    get id() {
      console.log('userData get id', id);
      return id;
    },
    set id(newId) {
      console.log('userData set id', newId);
      id = newId;
    },
  };
})();
