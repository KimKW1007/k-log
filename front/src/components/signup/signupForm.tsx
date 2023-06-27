import { Form } from '@components/login/LoginForm';
import React, { useEffect, useState } from 'react';
import Title from '@components/common/TitleBox';
import { useForm } from 'react-hook-form';
import styled, {css} from 'styled-components';
import SecondPage from './SecondPage';
import ThirdPage from './ThirdPage';
import FirstPage from './FirstPage';
import customApi from 'utils/customApi';
import { useMutation } from '@tanstack/react-query';
import CheckIdByEmailPage, { User } from './CheckIdByEmailPage';
import CommonModal from '@components/modal/CommonModal';

export interface Inputs {
  userId?: string;
  password?: string;
  confirmPassword?: string;
  userName?: string;
  userEmail?: string;
}

interface CurrentTitleType {
  [key: string]: {
    title: string;
    submitText: string;
  };
}

const SignupForm = () => {
  const CurrentTitle: CurrentTitleType = {
    first: {
      title: '서비스 계약 동의',
      submitText: '다음'
    },
    second: {
      title: '이름/이메일 입력',
      submitText: '다음'
    },
    checkIdByEmail: {
      title: '해당 이메일로 가입된 아이디',
      submitText: '새로 만들기'
    },
    third: {
      title: '아이디/비밀번호 입력',
      submitText: '가입완료하기'
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors
  } = useForm<Inputs>({
    mode: 'all'
  });

  // error modal
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalErrMsg, setModalErrMsg] = useState<string>('');

  const [currentLevel, setCurrentLevel] = useState<string>('first');
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  const [userIds, setUserIds] = useState<User[]>([]);

  const { postApi: createAccountPostApi } = customApi('/auth/signup');
  const { postApi: checkEmailPostApi } = customApi('/auth/checkemail');

  const checkSubmitType = currentLevel !== 'first' && currentLevel !== 'checkIdByEmail';

  const { mutate: createAccountMutate } = useMutation(createAccountPostApi, {
    onError(error: any) {
      console.log({ error: error.response.data.message });
      setIsOpenModal(true);
      setModalErrMsg(error.response.data.message);
    },
    async onSuccess(data) {
      console.log({ data });
    }
  });
  const { mutate: checkEmailMutate } = useMutation(checkEmailPostApi, {
    onError(error: any) {
      console.log({ error });
    },
    async onSuccess(data) {
      console.log({ data });
      setUserIds(data);
    }
  });

  const onSubmit = (data: Inputs) => {
    if (currentLevel === 'second') {
      checkEmailMutate({ userEmail: data.userEmail });
      setCurrentLevel((prev) => (prev = 'checkIdByEmail'));
    }
    if (currentLevel === 'third') {
      delete data.confirmPassword;
      createAccountMutate({ ...data });
    }
  };

  const onClickNextPage = () => {
    if (!checkSubmitType) {
      setIsAllChecked((prev) => !prev);
      if (currentLevel === 'first') setCurrentLevel((prev) => (prev = 'third'));
      if (currentLevel === 'checkIdByEmail') setCurrentLevel((prev) => (prev = 'third'));
    }
  };

  return (
    <SignUpForm onSubmit={handleSubmit(onSubmit)}>
      <Title>{CurrentTitle[currentLevel].title}</Title>
      {isOpenModal && <CommonModal setIsOpenModal={setIsOpenModal}>{modalErrMsg}</CommonModal>}
      {currentLevel === 'first' && <FirstPage setIsAllChecked={setIsAllChecked}></FirstPage>}
      {currentLevel === 'second' && <SecondPage setIsAllChecked={setIsAllChecked} register={register} watch={watch}></SecondPage>}
      {currentLevel === 'checkIdByEmail' && <CheckIdByEmailPage userIds={userIds}></CheckIdByEmailPage>}
      {currentLevel === 'third' && <ThirdPage setIsAllChecked={setIsAllChecked} register={register} watch={watch} errors={errors} setError={setError} clearErrors={clearErrors}></ThirdPage>}
      <SubmitBox>
        <SubmitBtn type={checkSubmitType ? 'submit' : 'button'} currentLevel={currentLevel} disabled={!isAllChecked} onClick={onClickNextPage}>
          {CurrentTitle[currentLevel].submitText}
        </SubmitBtn>
      </SubmitBox>
    </SignUpForm>
  );
};

export default SignupForm;

const SignUpForm = styled(Form)`
  height: 100%;
  justify-content: space-between;
  padding: 0 0 ${({ theme }) => theme.rem.p80};
`;

const SubmitBox = styled.div`
  width: 70%;
  height: 50px;
  margin-top: 50px;
`;

const SubmitBtn = styled.button<{currentLevel:string}>`
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight:bold;
  transition: .2s;
  &:not(:disabled){
    background:rgba(255, 109, 96,.8);
    color:#fff;
  }
  &:not(:disabled):hover{
    background:rgba(255, 109, 96,1);
  }
  ${({currentLevel})=> currentLevel === "checkIdByEmail" && css`
  &:not(:disabled){
    background:#f2f2f2;
    color:#acacac;
  }
  &:not(:disabled):hover{
    background:#e5e5e5;
    color:#777;
  }
  `}
  ${({currentLevel})=> currentLevel === "third" && css`
  &:not(:disabled){
    background: rgba(134, 150, 254,.8);
    color:#fff;
  }
  &:not(:disabled):hover{
    background:rgba(134, 150, 254,1);
  }
  `}
`;
