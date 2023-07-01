export interface ListTypes {
  [key: string]: string;
}

export const agreeList: ListTypes[] = [
  {
    id: 'serviceAgree',
    text: 'K-log 서비스 약관'
  },
  {
    id: 'collectionAgree',
    text: '개인정보 수집 및 이용'
  }
];

export const tabList: ListTypes[] = [
  { id: 'tabId', text: '아이디' },
  { id: 'tabPassword', text: '비밀번호' }
];

export const findList: ListTypes[] = [
  {
    id: 'tabId',
    findText: '아이디 찾기',
    loginText: '로그인 하러가기',
    singupText: '회원가입 하러가기'
  },
  {
    id: 'tabPassword',
    findText: '비밀번호 찾기',
    loginText: '로그인 하러가기',
    changePassword: '비밀번호 변경하기'
  }
];
