import { Form } from '@components/login/LoginForm';
import React, { useEffect, useState } from 'react';
import Title from '@components/common/TitleBox';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import SecondPage from './SecondPage';
import ThirdPage from './ThirdPage';
import FirstPage from './FirstPage';
import customApi from '@utils/customApi';
import { useMutation } from '@tanstack/react-query';
import IdListByEmail from '../common/IdListByEmail';
import CommonModal from '@components/modal/CommonModal';
import { useRouter } from 'next/router';
import FinallPage from '../common/FinallPage';
import { RegisterInputs, User } from '@src/types/user';
import { CurrentTitle } from '@utils/signupList';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    setValue
  } = useForm<RegisterInputs>({
    mode: 'all'
  });

  const router = useRouter();

  // error modal
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalErrMsg, setModalErrMsg] = useState<string>('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [isOpenCheckErrIdModal, setIsOpenCheckErrIdModal] = useState(false);
  const [checkErrMsg, setCheckErrMsg] = useState('');
  const [isPassCertificate, setIsPassCertificate] = useState(false);

  // 현재 단계
  const [currentLevel, setCurrentLevel] = useState<string>('third');
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  // 해당 이메일로 가입되어있는 아이디들
  const [userIds, setUserIds] = useState<User[]>([]);

  // title , submitText  관련
  const {title, submitText} = CurrentTitle[currentLevel](userIds);



  const { postApi: createAccountPostApi } = customApi('/auth/signup');
  const { postApi: checkEmailPostApi } = customApi('/auth/checkemail');

  // 버튼 타입 설정
  const checkSubmitType = currentLevel !== 'second' && currentLevel !== 'third';

  const { mutate: createAccountMutate } = useMutation(createAccountPostApi, {
    onError(error: any) {
      console.log({ error: error.config.data.userId });
      setIsOpenModal(true);
      setModalErrMsg(error.response.data.message);
    },
    onSuccess(data) {
      setCurrentLevel('finally');
    }
  });
  const { mutate: checkEmailMutate } = useMutation(checkEmailPostApi, {
    onError(error: any) {
      console.log({ error });
    },
    async onSuccess(data) {
      if (data.message) {
        setIsOpenCheckErrIdModal(true);
        setCheckErrMsg(data.message);
      }
      console.log({ data });
      setUserIds(data.user || data);
    }
  });

  const onSubmit = (data: RegisterInputs) => {
    if (currentLevel === 'second') {
      if (isPassCertificate) {
        checkEmailMutate({ userEmail: data.userEmail });
        setCurrentLevel((prev) => (prev = 'idListByEmail'));
      }
    }
    if (currentLevel === 'third') {
      delete data.confirmPassword;
      setCurrentUserId(data.userId!);
      createAccountMutate({ ...data });
    }
  };

  const onClickNextPage = () => {
    if (checkSubmitType) {
      setIsAllChecked((prev) => !prev);
      if (currentLevel === 'first') setCurrentLevel((prev) => (prev = 'second'));
      if (currentLevel === 'idListByEmail') {
        userIds.length < 5 ? setCurrentLevel((prev) => (prev = 'third')) : setCurrentLevel((prev) => (prev = 'second'));
      }
      if (currentLevel === 'finally') router.push('/login');
    }
  };

  
  return (
    <SignUpForm onSubmit={handleSubmit(onSubmit)}>
      <Title>{title}</Title>
      {isOpenModal && (
        <CommonModal setIsOpenModal={setIsOpenModal}>
          &#34;{currentUserId}&#34;은&#40;는&#41; {modalErrMsg}
        </CommonModal>
      )}
      {isOpenCheckErrIdModal && <CommonModal setIsOpenModal={setIsOpenCheckErrIdModal}>{checkErrMsg}</CommonModal>}
      {currentLevel === 'first' && <FirstPage setIsAllChecked={setIsAllChecked}></FirstPage>}
      {currentLevel === 'second' && (
        <SecondPage
          setIsAllChecked={setIsAllChecked}
          register={register}
          watch={watch}
          errors={errors}
          isPassCertificate={isPassCertificate}
          setIsPassCertificate={setIsPassCertificate}
          setValue={setValue}
          setError={setError}
          clearErrors={clearErrors}></SecondPage>
      )}
      {currentLevel === 'idListByEmail' && <IdListByEmail userIds={userIds}></IdListByEmail>}
      {currentLevel === 'third' && (
        <ThirdPage
          setIsAllChecked={setIsAllChecked}
          register={register}
          watch={watch}
          errors={errors}
          setError={setError}
          clearErrors={clearErrors}></ThirdPage>
      )}
      {currentLevel === 'finally' && <FinallPage isSignupFinal></FinallPage>}
      <FlexEmptyBox />
      <SubmitBox>
        <SubmitBtn type={!checkSubmitType ? 'submit' : 'button'} currentLevel={currentLevel} disabled={!isAllChecked} onClick={onClickNextPage}>
          {submitText}
        </SubmitBtn>
      </SubmitBox>
    </SignUpForm>
  );
};

export default SignupForm;

export const FlexEmptyBox = styled.div`
  width: 100%;
  flex-grow: 1;
`;

const SignUpForm = styled(Form)`
  height: 100%;
  justify-content: space-between;
  padding: 0 0 ${({ theme }) => theme.rem.p80};
`;

export const SubmitBox = styled.div`
  width: 70%;
  height: 50px;
  margin-top: 50px;
  border-radius: 10px;
  overflow: hidden;
`;

export const SubmitBtn = styled.button<{ currentLevel?: string }>`
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: bold;
  transition: 0.2s;

  &:not(:disabled) {
    background: rgba(255, 109, 96, 0.8);
    color: #fff;
  }
  &:not(:disabled):hover {
    background: rgba(255, 109, 96, 1);
  }
  ${({ currentLevel }) =>
    currentLevel === 'idListByEmail' &&
    css`
      &:not(:disabled) {
        background: #f2f2f2;
        color: #acacac;
      }
      &:not(:disabled):hover {
        background: #e5e5e5;
        color: #777;
      }
    `}
  ${({ currentLevel }) =>
    currentLevel === 'third' &&
    css`
      &:not(:disabled) {
        background: rgba(134, 150, 254, 0.8);
        color: #fff;
      }
      &:not(:disabled):hover {
        background: rgba(134, 150, 254, 1);
      }
    `}
    &:disabled {
    cursor: not-allowed;
  }
`;
