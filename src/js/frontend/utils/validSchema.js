export const signupSchema = {
  id: {
    value: '',
    get isValid() {
      return /^[a-z]+[a-z0-9]{5,19}$/g.test(this.value);
    },
    error: '아이디는 영문자로 시작하는 6~20자 영문자 또는 숫자이어야 합니다.',
  },
  password: {
    value: '',
    get isValid() {
      return /.{6,12}/.test(this.value);
    },
    error: '비밀번호는 6~20자 이어야합니다.',
  },
  repeatPassword: {
    value: '',
    get isValid() {
      return signupSchema.password.value === this.value;
    },
    error: '패스워드가 일치하지 않습니다.',
  },
  get isValid() {
    return this.id.isValid && this.password.isValid && this.repeatPassword.isValid;
  },
};

export const errorMessage = {
  signin: '아이디나 비밀번호가 올바르지 않습니다.',
  signup: '중복된 아이디입니다.',
};
