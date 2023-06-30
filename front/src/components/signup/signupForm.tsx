import { Form } from '@components/login/LoginForm';
import React, { useEffect, useState } from 'react';
import Title from '@components/common/TitleBox';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import SecondPage from './SecondPage';
import ThirdPage from './ThirdPage';
import FirstPage from './FirstPage';
import customApi from 'utils/customApi';
import { useMutation } from '@tanstack/react-query';
import CheckIdByEmailPage from '../common/CheckIdByEmail';
import CommonModal from '@components/modal/CommonModal';
import { useRouter } from 'next/router';
import FinallPage from './FinallPage';
import { Inputs, User } from '@src/types/user';



interface CurrentTitleType {
  [key: string]: {
    title: string;
    submitText: string;
  };
}

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    setValue
  } = useForm<Inputs>({
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
  const [currentLevel, setCurrentLevel] = useState<string>('first');
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  // 해당 이메일로 가입되어있는 아이디들
  const [userIds, setUserIds] = useState<User[]>([]);

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

  const onSubmit = (data: Inputs) => {
    if (currentLevel === 'second') {
      if (isPassCertificate) {
        checkEmailMutate({ userEmail: data.userEmail });
        setCurrentLevel((prev) => (prev = 'checkIdByEmail'));
      }
    }
    if (currentLevel === 'third') {
      delete data.confirmPassword;
      setCurrentUserId(data.userId!);
      createAccountMutate({ ...data });
    }
  };
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
      submitText: userIds.length < 5 ? '새로 만들기' : '돌아가기'
    },
    third: {
      title: '아이디/비밀번호 입력',
      submitText: '가입하기'
    },
    finally: {
      title: '회원가입 완료',
      submitText: '로그인하기'
    }
  };

  const onClickNextPage = () => {
    if (checkSubmitType) {
      setIsAllChecked((prev) => !prev);
      if (currentLevel === 'first') setCurrentLevel((prev) => (prev = 'second'));
      if (currentLevel === 'checkIdByEmail') {
        userIds.length < 5 ? setCurrentLevel((prev) => (prev = 'third')) : setCurrentLevel((prev) => (prev = 'second'));
      }
      if (currentLevel === 'finally') router.push('/login');
    }
  };

  return (
    <SignUpForm onSubmit={handleSubmit(onSubmit)}>
      <Title>{CurrentTitle[currentLevel].title}</Title>
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
      {currentLevel === 'checkIdByEmail' && <CheckIdByEmailPage userIds={userIds}></CheckIdByEmailPage>}
      {currentLevel === 'third' && (
        <ThirdPage
          setIsAllChecked={setIsAllChecked}
          register={register}
          watch={watch}
          errors={errors}
          setError={setError}
          clearErrors={clearErrors}></ThirdPage>
      )}
      {currentLevel === 'finally' && <FinallPage></FinallPage>}
      <SubmitBox>
        <SubmitBtn type={!checkSubmitType ? 'submit' : 'button'} currentLevel={currentLevel} disabled={!isAllChecked} onClick={onClickNextPage}>
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
  border-radius: 10px;
  overflow: hidden;
`;

const SubmitBtn = styled.button<{ currentLevel: string }>`
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
    currentLevel === 'checkIdByEmail' &&
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
`;
