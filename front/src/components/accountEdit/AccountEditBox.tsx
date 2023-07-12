import { OnlyAlignCenterFlex, OnlyJustifyCenterFlex } from '@components/common/CommonFlex';
import ErrorMsgBox from '@components/common/error/ErrorMsgBox';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import customApi from '@utils/customApi';
import { handleOpenPopup } from '@utils/handleOpenPopup';
import { GET_USER } from '@utils/queryKeys';
import { accountEditInputListProps, vaildaters } from '@utils/userInfoEdit';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import EditInput from './EditInput';
import { useRecoilState } from 'recoil';
import { userInfomation } from '@atoms/atoms';

const AccountEditBox = ({ name, title }: accountEditInputListProps) => {
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
  const [userInfo, setUserInfo] = useRecoilState(userInfomation);

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



  const onSubmit = (data: any) => {
    if (name === 'userEmail') {
      handleOpenPopup('/accountEdit/changeEmail', '이메일 변경', 546, 588);
      return;
    }
    if (!isDirty || data[name] === currentUserInfo[name]) {
      alert(`"${title}"의 변경된 값이 없습니다.`);
      return;
    }
    mutate(data);
  };

  useEffect(() => {
    if (isDirty) clearErrors(name);
  }, [isDirty, watch(name)]);

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
      setUserInfo(data);
    }
  }, [data]);

  return (
    <EditForm onSubmit={handleSubmit(onSubmit)}>
      <EditInputArea>
        <EditInputInnerArea>
          <EditInput
            title={title}
            name={name}
            defaultValue={currentUserInfo && currentUserInfo[name]}
            register={register(name, {
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
          <AbsoluteBox>{errors[name] && name !== 'userEmail' && <ErrorMsgBox errColor errors={`${errors[name]?.message}`} isEditPage />}</AbsoluteBox>
        </EditInputInnerArea>
      </EditInputArea>
    </EditForm>
  );
};

export default AccountEditBox;

export const AbsoluteBox = styled.div`
  position: absolute;
  width: 100%;
  display:flex;
  justify-content:center;
  left: 50%;
  transform:translateX(-50%);
`;

export const EditForm = styled.form`
  & + & {
    border-top: 1px solid #e5e5e5a1;
  }
`;
export const EditInputArea = styled(OnlyJustifyCenterFlex)`
  padding: 30px 30px;
`;
export const EditInputInnerArea = styled.div`
  position: relative;
`;

