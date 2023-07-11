import { OnlyAlignCenterFlex, OnlyJustifyCenterFlex } from '@components/common/CommonFlex';
import ErrorMsgBox from '@components/common/error/ErrorMsgBox';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import customApi from '@utils/customApi';
import { handleOpenPopup } from '@utils/handleOpenPopup';
import { GET_USER } from '@utils/queryKeys';
import { vaildaters } from '@utils/userInfoSetting';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

interface UserInfoSettingBoxProps {
  [key: string]: string;
}

const UserInfoSettingBox = ({ name, title }: UserInfoSettingBoxProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    setError,
    clearErrors,
    setValue
  } = useForm({ mode: 'all' });

  const [currentUserInfo, setCurrentUserInfo] = useState<any>({});
  const queryClient = useQueryClient();

  const { patchApi } = customApi('/auth/changeThings');
  const { mutate } = useMutation(patchApi, {
    onError(error: any) {
      console.log({ error });
      setError(name, { type: 'custom', message: error.response.data.message });
    },
    onSuccess(data) {
      sessionStorage.setItem('jwtToken', cookieData);
      alert(`"${title}"이(가) 변경 되었습니다.`);
    }
  });

  // 현재 쿠키값
  const { getApi: cookieApi } = customApi('/auth/cookies');
  const { data: cookieData } = useQuery(['GET_COOKIE'], cookieApi);
  const [checkCookie, setCheckCookie] = useState(false);
  // 유저 데이터
  const { getApi } = customApi('/auth/authenticate');
  const { data } = useQuery([GET_USER], getApi, {
    enabled: !!checkCookie
  });

  useEffect(() => {
    if (isDirty) clearErrors(name);
  }, [isDirty, watch(name)]);

  const onSubmit = (data: any) => {
    console.log({ data });
    if (name === 'userEmail') {
      handleOpenPopup('/accountSetting/changeEmail', '이메일 변경', 546, 588);
      return;
    }
    if (!isDirty || data[name] === currentUserInfo[name]) {
      alert(`"${title}"의 변경된 값이 없습니다.`);
      return;
    }
    mutate(data);
  };

  useEffect(() => {
    if (document.hasFocus()) {
      queryClient.invalidateQueries([GET_USER]);
      sessionStorage.setItem('jwtToken', cookieData);
    }
  });

  // 쿠키가 들어오고 유저데이터 부르기
  useEffect(() => {
    if (cookieData) {
      setCheckCookie(typeof window !== 'undefined' ? Boolean(sessionStorage.getItem('jwtToken') === cookieData) : false);
    }
  }, [cookieData]);
  useEffect(() => {
    if (data) {
      setCurrentUserInfo(data);
    }
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
                  required: name !== 'userEmail' && '값을 입력해주세요',
                  validate: {
                    currentVaildate: (value) => {
                      if (vaildaters[name]) return vaildaters[name](value);
                    }
                  }
                })}
                isError={Boolean(errors[name])}
                disabled={name === 'userEmail'}
              />
            </SettingInputInnerBox>
            <SubmitBtnBox>
              <SubmitBtn>{name === 'userName' ? '개명' : '변경'}</SubmitBtn>
            </SubmitBtnBox>
          </SettingInputBox>
          <AbsoluteBox>{errors[name] && name !== 'userEmail' && <ErrorMsgBox errColor errors={`${errors[name]?.message}`} isSettingPage />}</AbsoluteBox>
        </SettingInputInnerArea>
      </SettingInputArea>
    </SettingForm>
  );
};

export default UserInfoSettingBox;

const AbsoluteBox = styled.div`
  position: absolute;
  width: 100%;
  left: 18%;
`;

const SettingForm = styled.form`
  & + & {
    border-top: 1px solid #e5e5e5a1;
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

export const SettingInputInnerArea = styled.div`
  position: relative;
`;

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

export const SettingInput = styled.input<{ isError?: boolean }>`
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
  ${({ isError, theme }) =>
    isError &&
    `
  background: ${theme.color.err}1a;
  border: 2px solid ${theme.color.err}1a;
  &:focus {
    border: 2px solid ${theme.color.err}cc;
  }
  `}
  &:disabled {
    color: #454545;
    background: #898989;
    pointer-events: none;
  }
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
