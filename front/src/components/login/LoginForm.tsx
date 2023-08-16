import UserInfoInput from '@/src/components/common/UserInfoInput';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { LogIn } from '@styled-icons/ionicons-solid';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import customApi from '@/src/utils/customApi';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { userInfomation } from '@/src/atoms/atoms';
import Title from '@/src/components/common/TitleBox';
import LoginErrBox from './LoginErrBox';
import Loading from '@/src/components/common/Loading/Loading';
import { AllCenterFlex } from '@/src/components/common/CommonFlex';
import { RegisterInputs } from '@/src/types/user';
import { handleOpenPopup } from '@/src/utils/handleOpenPopup';

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
      sessionStorage.setItem('access_token', data.accessToken);
      sessionStorage.setItem('access_token_expiration', `${new Date().getTime() + process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRATION!}`);
      const userData = await getApi(true);
      setUser(userData);
      router.back();
    }
  });

  const onSubmit = (data: RegisterInputs) => {
    mutate({ ...data });
  };

  const onClickFindIdOrPassword = (e: React.MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    handleOpenPopup('/identity/find', '아이디/비밀번호 찾기', 545, 560);
    return e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>로그인</Title>
      {isError && <LoginErrBox></LoginErrBox>}
      <InputListBox>
        <UserInfoInput bold type="text" inputName="아이디" register={register('userId', { required: true })} watch={watch('userId')} errColor={isError} />
        <UserInfoInput type="password" inputName="비밀번호" register={register('password', { required: true })} watch={watch('password')} errColor={isError} />
      </InputListBox>
      <SubmitBox>
        {isLoading ? (
          <Loading />
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
  color: #232323;
`;

const SubmitBox = styled(AllCenterFlex)`
  position: relative;
  width: 100px;
  height: 100px;
  margin-top: 70px;
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
  margin: 30px 0;
  a {
    display: block;
    text-align: center;
    margin: 10px 0;
    font-weight: bold;
    color: #666;
    &:hover {
      color: #232323;
    }
  }
  @media (max-width: 660px) {
    margin: 20px 0;
    a {
      font-size: 14px;
      margin: 14px 0;
    }
  }
`;

export const InputListBox = styled.div`
  width: 100%;
`;
