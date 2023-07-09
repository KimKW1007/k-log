import { ACCOUNT_ID_REGEX, EMAIL_REGEX, NAME_REGEX } from "@constant/regex";
import { errMsg } from "./singupThirdErrMsg";
import { User } from "@src/types/user";

interface test{
  name: string,
  title : string
}

export const userInfoSettingInputList: test[] = [
  {
    name : 'userId',
    title : "아이디"
  },
  {
    name : 'userName',
    title : "이름"
  },
  {
    name : 'userEmail',
    title : "이메일"
  },
];

interface vaildateType {
  [key: string]: (value?: any) => boolean | string;
}


export const vaildaters: vaildateType = {
  userId: (value?: any) => {
    return ACCOUNT_ID_REGEX.test(value!) || errMsg['userIdRegexMsg'];
  },
  userName: (value?: any) => {
    return NAME_REGEX.test(value!) || '2~4자의 한글,영문만 입력해주세요.';
  }
};

export const currentTipText ={
  userId: errMsg['userIdRegexMsg'],
  userName : '2~4자의 한글,영문만 입력해주세요.',
}