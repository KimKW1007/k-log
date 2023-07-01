interface keyString {
  [key: string]: string;
}


export const errMsg: keyString = {
  userIdMinLength: '4자 이상 입력해 주세요.',
  passwordMinLength: '8자 이상 입력해 주세요.',
  userIdRegexMsg: '영문으로 시작하는 4~24자의 영문+숫자로 입력해주세요.',
  passwordRegexMsg: '8자리 이상의 영문, 숫자, 특수문자 조합을 입력해주세요.'
};