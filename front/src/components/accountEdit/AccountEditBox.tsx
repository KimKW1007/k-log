import { AllCenterFlex, OnlyJustifyCenterFlex } from '@components/common/CommonFlex';
import ErrorMsgBox from '@components/common/error/ErrorMsgBox';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import customApi from '@utils/customApi';
import { handleOpenPopup } from '@utils/handleOpenPopup';
import { GET_COOKIE, GET_USER } from '@utils/queryKeys';
import { accountEditInputListProps, vaildaters } from '@utils/userInfoEdit';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
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
    clearErrors
  } = useForm({ mode: 'all' });

  const [currentUserInfo, setCurrentUserInfo] = useState<any>({});
  const [userInfo, setUserInfo] = useRecoilState(userInfomation);

  const { patchApi } = customApi('/auth/changeThings');
  const { mutate } = useMutation(patchApi, {
    onError(error: any) {
      setError(name, { type: 'custom', message: error.response.data.message });
    },
    onSuccess(data) {
      refetch();
      cookieRefetch();
      alert(`"${title}"이(가) 변경 되었습니다.`);
    }
  });

  // 현재 쿠키값
  const { getApi: cookieApi } = customApi('/auth/cookies');
  const { data: cookieData, refetch: cookieRefetch } = useQuery([GET_COOKIE], () => cookieApi());
  
  // 유저 데이터
  const { getApi } = customApi('/auth/authenticate');
  const { data, refetch } = useQuery([GET_USER], () => getApi(true));

  const onSubmit = (data: any) => {
    if (name === 'userEmail') {
      handleOpenPopup('/accountEdit/changeEmail', '이메일 변경', 545, 588);
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
    if (data) {
      setCurrentUserInfo(data);
      setUserInfo(data);
    }
  }, [data]);

  useEffect(() => {
    if (localStorage.getItem('isOpenPopup')) {
      refetch();
      cookieRefetch();
      sessionStorage.setItem('access_token', cookieData);
    }
  }, [localStorage.getItem('isOpenPopup')]);

  return (
    <EditForm onSubmit={handleSubmit(onSubmit)}>
      <EditInputArea>
        <EditInputInnerArea>
          <EditInputBox>
            <EditInput
              title={title}
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
            <SubmitBtnBox>
              <SubmitBtn>{name === 'userName' ? '개명' : '변경'}</SubmitBtn>
            </SubmitBtnBox>
          </EditInputBox>
          <AbsoluteBox>{errors[name] && name !== 'userEmail' && <ErrorMsgBox errColor errors={`${errors[name]?.message}`} isEditPage />}</AbsoluteBox>
        </EditInputInnerArea>
      </EditInputArea>
    </EditForm>
  );
};

export default AccountEditBox;
const EditInputBox = styled(AllCenterFlex)`
  column-gap: 10px;
  width: 100%;
`;
const SubmitBtnBox = styled.div`
  @media (max-width: 660px) {
    display: flex;
    height: 100%;
    align-items: end;
    padding-bottom: 5px;
  }
`;
const SubmitBtn = styled.button`
  padding: 8px 16px 8px;
  border: 1px solid #cfcfcf;
  background: linear-gradient(#fff 10%, #ddd);
  font-size: 15px;
  font-weight: 900;
  letter-spacing: -1.4px;
`;

export const AbsoluteBox = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  left: 50%;
  transform: translateX(-50%);
  bottom: -50%;
`;

export const EditForm = styled.form`
  & + & {
    border-top: 1px solid #e5e5e5a1;
  }
`;
export const EditInputArea = styled(OnlyJustifyCenterFlex)`
  padding: 30px 30px;
  @media (max-width: 660px) {
    padding: 30px 10px;
  }
`;
export const EditInputInnerArea = styled(OnlyJustifyCenterFlex)`
  position: relative;
  width: 100%;
`;
