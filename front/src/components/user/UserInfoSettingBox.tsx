import { userInfomation } from '@atoms/atoms';
import { AllCenterFlex, OnlyAlignCenterFlex, OnlyJustifyCenterFlex } from '@components/common/CommonFlex';
import ErrorMsgBox from '@components/common/error/ErrorMsgBox';
import { ACCOUNT_ID_REGEX, EMAIL_REGEX, NAME_REGEX } from '@constant/regex';
import { User } from '@src/types/user';
import { useQuery } from '@tanstack/react-query';
import customApi from '@utils/customApi';
import { errMsg } from '@utils/singupThirdErrMsg';
import { vaildaters } from '@utils/userInfoSetting';
import React, { useEffect, useState } from 'react';
import { FieldValues, UseFormRegister, useForm, useFormContext } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

interface UserInfoSettingBoxProps {
  [key: string]: string;
}

const UserInfoSettingBox = ({ name, title }: UserInfoSettingBoxProps) => {
  const [currentUserInfo, setCurrentUserInfo] = useState<any>({});

  const { getApi } = customApi('/auth/authenticate');
  const { data } = useQuery(['getUser'], getApi);
  const [currentUser, setCurrentUser] = useRecoilState(userInfomation);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    setError,
    clearErrors,
    setValue
  } = useForm({ mode: 'all' });

  console.log({ errors });

  useEffect(()=>{
    if(isDirty) clearErrors(name)
  },[isDirty,watch(name)])

  const onSubmit = (data: any) => {
    if (!isDirty || data[name] === currentUserInfo[name]) {
      setError(name, { type: 'custom', message: '변경된 값이 없습니다.' });
      alert(`"${title}"란의 변경된 값이 없습니다.`)
      return;
    }
    if (name === 'userEmail') return;
  };

  useEffect(() => {
    if (data) setCurrentUserInfo(data);
  }, [data]);

  return (
    <SettingForm onSubmit={handleSubmit(onSubmit)}>
      <SettingInputArea>
        <SettingInputInnerArea>
          <SettingInputBox>
            <SettingInputInnerBox>
              <SettingInputTitleBox>
                <h4>{title}</h4>
              </SettingInputTitleBox>
              <SettingInput
                defaultValue={data && data[name]}
                type="text"
                {...register(name, {
                  required: '값을 입력해주세요',
                  validate: {
                    currentVaildate: (value) => {
                      return vaildaters[name](value);
                    }
                  }
                })}
                isError={Boolean(errors[name])}
              />
            </SettingInputInnerBox>
            <SubmitBtnBox>
              <SubmitBtn>{name === 'userName' ? "개명" : "변경"}</SubmitBtn>
            </SubmitBtnBox>
          </SettingInputBox>
          {/* {errors[name] && name !== 'userEmail' && <ErrorMsgBox errColor errors={`${errors[name]?.message}`}  isSettingPage/>} */}
        </SettingInputInnerArea>
      </SettingInputArea>
    </SettingForm>
  );
};

export default UserInfoSettingBox;
const SettingForm = styled.form`
  &+&{
    border-top : 1px solid #e5e5e5a1;
  }
`;
export const SettingInputArea = styled(OnlyJustifyCenterFlex)`
  padding: 30px 30px;
  
`;
export const SettingInputBox = styled(OnlyAlignCenterFlex)`
  column-gap: 10px;
`;
export const SettingInputInnerBox = styled(OnlyAlignCenterFlex)`
  column-gap: 20px;
`;

export const SettingInputInnerArea = styled.div``;

export const SettingInputTitleBox = styled.div<{ isPassword?: boolean }>`
  width: 80px;
  ${({ isPassword }) =>
    isPassword &&
    `
    width: 120px;
  `}
  h4 {
    font-size: 18px;
  }
`;

export const SettingInput = styled.input<{isError ?: boolean;}>`
  border: 2px solid #a5a5a5;
  width: 280px;
  line-height: ${({ theme }) => theme.rem.p26};
  padding: ${({ theme }) => theme.rem.p10} ${({ theme }) => theme.rem.p10};
  font-size: ${({ theme }) => theme.rem.p16};
  background: #f0f0f0;
  border-radius: 5px;
  transition: 0.2s;
  outline: none;
  font-weight: 600;
  &:focus {
    border: 2px solid #000;
    background: #fff;
  }
  ${({isError, theme}) => isError &&`
  background: ${theme.color.err}1a;
  border: 2px solid ${theme.color.err}1a;
  &:focus {
    border: 2px solid ${theme.color.err}cc;
  }
  `}
`;

const SubmitBtnBox = styled.div``;
const SubmitBtn = styled.button`
  padding: 8px 16px 8px;
  border: 1px solid #cfcfcf;
  background: linear-gradient(#fff 10%, #ddd);
  font-size: 15px;
  font-weight: 900;
  letter-spacing: -1.4px;
`;
