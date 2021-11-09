const User = (() => {
  let state = [
    { userId: 1, password: '123456', createdAt: new Date() },
    { userId: 2, password: '123456', createdAt: new Date() },
    { userId: 3, password: '123456', createdAt: new Date() },
  ];

  return {
    get state() {
      return state;
    },

    set state(newUser) {
      state = [...state, newUser];
    },
  };
})();

module.exports = User;
