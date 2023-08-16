import { User } from '@/src/types/user';

export interface CurrentTitleType {
  [key: string]: (userIds?: User[]) => {
    title: string;
    submitText: string;
  };
}
export const CurrentTitle: CurrentTitleType = {
  first() {
    return { title: '서비스 계약 동의', submitText: '다음' };
  },
  second() {
    return { title: '이름/이메일 입력', submitText: '다음' };
  },
  idListByEmail(userIds?: User[]) {
    return { title: '해당 이메일로 가입된 아이디', submitText: userIds!.length < 5 ? '새로 만들기' : '돌아가기' };
  },
  third() {
    return { title: '아이디/비밀번호 입력', submitText: '가입하기' };
  },
  finally() {
    return { title: '회원가입 완료', submitText: '로그인하기' };
  }
};
