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
