import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Form, InputListBox } from '@components/login/LoginForm';
import { FormProvider, useForm } from 'react-hook-form';
import { RegisterInputs, User } from '@src/types/user';
import { FlexEmptyBox, SubmitBox, SubmitBtn } from '@components/signup/signupForm';
import customApi from '@utils/customApi';
import { useMutation } from '@tanstack/react-query';
import FindId from './FindId';
import FindPassword from './FindPassword';
import { ListTypes } from '@utils/mapList';
import { useRouter } from 'next/router';
import CommonModal from '@components/modal/CommonModal';
import { NotFoundByEmail, inputResetBoolean } from '@atoms/atoms';
import { useRecoilState } from 'recoil';

const FindForm = ({ isOnPasswordTab, textById }: { isOnPasswordTab: boolean; textById?: ListTypes }) => {
  const [resetState, setResetState] = useRecoilState(inputResetBoolean);
  const [isFailed, setIsFailed] = useRecoilState(NotFoundByEmail);
  const router = useRouter();

  const [isPassCertificate, setIsPassCertificate] = useState<boolean>(false);

  const [submitText, setSubmitText] = useState<string | undefined>('');

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState('');

  const [isSuccessChangePassword, setIsSuccessChangePassword] = useState<boolean>(false);
  // 해당 이메일로 가입되어있는 아이디 확인
  const [isClickFindBtn, setIsClickFindBtn] = useState<boolean>(false);
  const [userIds, setUserIds] = useState<User[]>([]);
  const { postApi: checkEmailPostApi } = customApi('/auth/checkemail');
  const { mutate: checkEmailMutate } = useMutation(checkEmailPostApi, {
    onError(error: any) {
      setErrMsg(error.response.data.message);
      setIsOpenModal(true);
      setIsFailed(true);
    },
    onSuccess(data) {
      console.log(data);
      setIsClickFindBtn(true);
      setUserIds(data.user || data);
    }
  });
  // ================================================
  // 비밀번호 변경 전 아이디 이메일 확인
  const { postApi: checkIdEmailPostApi } = customApi('/find/checkUser');
  const { mutate: checkIdEmailMutate } = useMutation(checkIdEmailPostApi, {
    onError(error: any) {
      setErrMsg(error.response.data.message);
      setIsOpenModal(true);
      setIsFailed(true);
    },
    onSuccess(data) {
      setIsClickFindBtn(true);
    }
  });
  // ================================================
  // 비밀번호 변경
  const { patchApi: changePasswordPatchApi } = customApi('/find/changePassword');
  const { mutate: changePasswordMutate } = useMutation(changePasswordPatchApi, {
    onError(error: any) {
      setErrMsg(error.response.data.message);
      setIsOpenModal(true);
    },
    onSuccess(data) {
      setIsSuccessChangePassword(true);
    }
  });
  // ================================================

  const submitDisabledRegex = () => {
    //아이디 찾기 일때
    if (!isOnPasswordTab) {
      // 검색 결과로 넘어가기 전
      if (!isClickFindBtn) {
        return !watch('token') || !isPassCertificate;
      } else {
        return false;
      }
      // 비밀번호 찾기 일때
    } else {
      // 검색 결과로 넘어가기 전
      if (!isClickFindBtn) {
        return !watch('userId') || !watch('token') || !isPassCertificate;
      } else {
        return !watch('password') || !watch('confirmPassword');
      }
    }
  };
  // ================================================
  const currentSubmitText = () => {
    if (textById) {
      if (!isClickFindBtn) {
        return textById.findText;
      }
      if (textById.id === 'tabId' && userIds.length <= 0) return textById.singupText;
      if (textById.id === 'tabPassword' && isClickFindBtn && isSuccessChangePassword) return textById.loginText;
      if (textById.id === 'tabPassword' && isClickFindBtn) return textById.changePassword;
      return textById.loginText;
    }
  };
  useEffect(() => {
    setSubmitText(currentSubmitText());
  }, [currentSubmitText]);
  // ================================================
  const methods = useForm<RegisterInputs>({
    mode: 'all'
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    setValue,
    clearErrors,
    reset
  } = methods;


  const onSubmit = ({ userEmail, userId, password }: RegisterInputs) => {
    if (submitText?.includes('아이디')) {
      checkEmailMutate({ userEmail });
    }
    if (submitText?.includes('로그인')) {
      opener.location.reload();
      window.close();
    }
    if (submitText?.includes('회원가입')) {
      opener.location.replace('/signup')
      window.close();
    }
    if (submitText?.includes('비밀번호 찾기')) {
      checkIdEmailMutate({ userEmail, userId });
    }
    if (submitText?.includes('비밀번호 변경')) {
      changePasswordMutate({ userEmail, userId, password });
    }
  };

  // 탭 이동 시 all clear
  useEffect(() => {
    setIsClickFindBtn(false);
    reset();
    setIsPassCertificate(false);
    setIsSuccessChangePassword(false);
  }, [resetState]);

  return (
    <FormProvider {...methods}>
      <FindBoxForm onSubmit={handleSubmit(onSubmit)}>
        {!isOnPasswordTab ? (
          <FindId
            isClickFindBtn={isClickFindBtn}
            userIds={userIds}
            setIsPassCertificate={setIsPassCertificate}
            isPassCertificate={isPassCertificate}
          />
        ) : (
          <FindPassword
            isClickFindBtn={isClickFindBtn}
            setIsPassCertificate={setIsPassCertificate}
            isPassCertificate={isPassCertificate}
            isSuccessChangePassword={isSuccessChangePassword}
          />
        )}
        <FlexEmptyBox />
        <SubmitBox>
          <SubmitBtn type="submit" disabled={submitDisabledRegex()}>
            {currentSubmitText()}
          </SubmitBtn>
        </SubmitBox>
      </FindBoxForm>
      {isOpenModal && <CommonModal setIsOpenModal={setIsOpenModal}>{errMsg}</CommonModal>}
    </FormProvider>
  );
};

export default FindForm;

const FindBoxForm = styled(Form)`
  height: 100%;
`;
