const User = (() => {
  let state = [
    { userId: 'jkrang1702', password: '123456', createdAt: new Date() },
    { userId: 'jkrang105', password: '123456', createdAt: new Date() },
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
