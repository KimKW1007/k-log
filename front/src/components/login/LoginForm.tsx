import UserInfoInput from '@components/common/UserInfoInput';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Power } from '@styled-icons/ionicons-solid/Power';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import customApi from 'utils/customApi';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { userInfomation } from '@src/atoms/atoms';
interface Inputs {
  userId: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const { postApi } = customApi('/auth/signin');
  const { getApi } = customApi('/auth/authenticate');
  const [user, setUser] = useRecoilState(userInfomation);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>({
    mode: 'onSubmit'
  });

  
  

  const { mutate } = useMutation(postApi, {
    onError(error: any) {
      console.log({ error });
    },
    async onSuccess(data) {
      sessionStorage.setItem("jwtToken", data.accessToken);
      const userData = await getApi();
      setUser(userData)
      router.push('/');
    }
  });

  const onSubmit = (data: Inputs) => {
    mutate({...data})
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <LoginTitleBox>
          <h2>로그인</h2>
        </LoginTitleBox>
        <InputsBox>
          <UserInfoInput bold type="text" inputName="아이디" register={register('userId', { required: true })} watch={watch('userId')} />
          <UserInfoInput type="password" inputName="비밀번호" register={register('password', { required: true })} watch={watch('password')} />
        </InputsBox>
        <SubmitBox>
          <SubmitBtn type="submit" disabled={!watch('userId') || !watch('password')}>
            <PowerIcon></PowerIcon>
          </SubmitBtn>
        </SubmitBox>
        <SignUpAskQuestionBox>
          <Link href={'#'}>아이디/비밀번호를 잃어 버리셨나요?</Link>
          <Link href={'/signup'}>아이디 생성하기</Link>
        </SignUpAskQuestionBox>
      </Form>
    </React.Fragment>
  );
};

export default LoginForm;

const Form = styled.form`
  width: 100%;
  height: 100%;
  flex-flow: column;
  display: flex;
  align-items: center;
`;

const LoginTitleBox = styled.div`
  margin: 0 0 ${({ theme }) => theme.rem.p100};
  h2 {
    font-size: ${({ theme }) => theme.rem.p36};
  }
`;

const InputsBox = styled.div`
  width: 100%;
  div:first-child {
    margin-bottom: ${({ theme }) => theme.rem.p20};
  }
`;

const SubmitBox = styled.div`
  position: relative;
  width: ${({ theme }) => theme.rem.p100};
  height: ${({ theme }) => theme.rem.p100};
  margin-top: ${({ theme }) => theme.rem.p70};
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 15px;
  border: 2px solid rgba(0, 0, 0, 0);
  background: rgb(147, 118, 224);
  transition: 0.3s;
  &:disabled {
    border: 2px solid rgb(221, 221, 221);
    background: rgba(0, 0, 0, 0);
  }
  &:not(:disabled):hover {
    background: rgb(127, 98, 204);
  }
`;

const PowerIcon = styled(Power)`
  width: 50%;
  color: #e9e9e9;
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
