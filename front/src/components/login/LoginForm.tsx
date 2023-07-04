import UserInfoInput from '@components/common/UserInfoInput';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { LogIn } from '@styled-icons/ionicons-solid';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import customApi from '@utils/customApi';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { userInfomation } from '@atoms/atoms';
import Title from '@components/common/TitleBox';
import LoginErrBox from './LoginErrBox';
import Loading from '@components/common/Loading';
import { AllCenterFlex } from '@components/common/CommonFlex';
import { RegisterInputs } from '@src/types/user';

const LoginForm = () => {
  const router = useRouter();
  const { postApi } = customApi('/auth/signin');
  const { getApi } = customApi('/auth/authenticate');
  const [user, setUser] = useRecoilState(userInfomation);
  const [isError, setIsError] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterInputs>({
    mode: 'onSubmit'
  });

  const { mutate, isLoading } = useMutation(postApi, {
    onError(error: any) {
      setIsError(true);
    },
    async onSuccess(data) {
      sessionStorage.setItem('jwtToken', data.accessToken);
      const userData = await getApi();
      setUser(userData);
      router.push('/');
    }
  });

  const onSubmit = (data: RegisterInputs) => {
    mutate({ ...data });
  };

  const onClickFindIdOrPassword = (e: React.MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    window.open(
      '/identity/find',
      '아이디/비밀번호 찾기',
      'top=20px, left=20px, width=545px, height=560px, scrollbars=no , toolbar=no, staus=no, memubar=no, location=no, directoryies=no, resizable=no'
    );
    return e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>로그인</Title>
      {isError && <LoginErrBox></LoginErrBox>}
      <InputListBox>
        <UserInfoInput
          bold
          type="text"
          inputName="아이디"
          register={register('userId', { required: true })}
          watch={watch('userId')}
          errColor={isError}
        />
        <UserInfoInput
          type="password"
          inputName="비밀번호"
          register={register('password', { required: true })}
          watch={watch('password')}
          errColor={isError}
        />
      </InputListBox>
      <SubmitBox>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <SubmitBtn type="submit" title="로그인" disabled={!watch('userId') || !watch('password')}>
            <PowerIcon></PowerIcon>
          </SubmitBtn>
        )}
      </SubmitBox>
      <SignUpAskQuestionBox>
        <Link href={'#'} onClick={onClickFindIdOrPassword}>
          아이디/비밀번호를 잃어버리셨나요?
        </Link>
        <Link href={'/signup'}>아이디 생성하기</Link>
      </SignUpAskQuestionBox>
    </Form>
  );
};

export default LoginForm;

export const Form = styled.form`
  width: 100%;
  flex-flow: column;
  display: flex;
  align-items: center;
`;

const SubmitBox = styled(AllCenterFlex)`
  position: relative;
  width: ${({ theme }) => theme.rem.p100};
  height: ${({ theme }) => theme.rem.p100};
  margin-top: ${({ theme }) => theme.rem.p70};
`;

const PowerIcon = styled(LogIn)`
  width: 50%;
  margin-left: -8px;
  transition: color 0.3s;
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 30px;
  border: 2px solid rgba(0, 0, 0, 0);
  background: rgb(147, 118, 224);
  transition: 0.3s;
  ${PowerIcon} {
    color: #fff;
  }
  &:disabled {
    border: 2px solid rgb(221, 221, 221);
    background: rgba(0, 0, 0, 0);
    ${PowerIcon} {
      color: #e9e9e9;
    }
  }
  &:not(:disabled):hover {
    background: rgb(127, 98, 204);
  }
  &:not(:disabled):active {
    background: rgb(107, 70, 180);
  }
`;

const SignUpAskQuestionBox = styled.div`
  margin: ${({ theme }) => theme.rem.p30} 0;
  a {
    display: block;
    text-align: center;
    margin: ${({ theme }) => theme.rem.p10} 0;
    font-weight: bold;
    color: #666;
    &:hover {
      color: #232323;
    }
  }
`;

export const InputListBox = styled.div`
  width: 100%;
`;
