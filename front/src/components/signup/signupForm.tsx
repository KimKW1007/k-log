import { Form } from '@components/login/LoginForm';
import React, { useEffect, useState } from 'react';
import Title from '@components/common/TitleBox';
import { InputsBox } from '@components/common/InputsBox';
import UserInfoInput from '@components/common/UserInfoInput';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { ACCOUNT_ID_REGEX, EMAIL_REGEX } from '@src/constant/regex';
import CheckBoxInputs from '@components/common/CheckBoxInputs';
import SecondPage from './SecondPage';
import ThirdPage from './ThirdPage';
import FirstPage from './FirstPage';

export interface Inputs {
  userId?: string;
  password?: string;
  confirmPassword?: string;
  userName?: string;
  userEmail?: string;
}


interface CurrentTitleType {
  [anyKeyword: string]: string;
}

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>({
    mode: 'all'
  });

  

  const [currentLevel, setCurrentLevel] = useState<string>('first');
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const onSubmit = (data: Inputs) => {
    if(currentLevel === 'second'){

    }
  };

  const CurrentTitle: CurrentTitleType = {
    first: '서비스 계약 동의',
    second: '이름/이메일 입력',
    third: '아이디/비밀번호 입력'
  };

  useEffect(()=>{
    if(watch("userEmail")&&watch("userName")){
      setIsAllChecked(true)
    }else{
      setIsAllChecked(false)
    }
    console.log(isAllChecked);
  },[watch("userEmail"),watch("userName")])

  const onClickNextPage = ()=>{
    if(currentLevel !== 'first'){
      setIsAllChecked(prev => !prev)
      setCurrentLevel(prev => prev === 'first' ? 'second' : 'third')
    }
  }

  return (
    <SignUpForm onSubmit={handleSubmit(onSubmit)}>
      <Title>{CurrentTitle[currentLevel]}</Title>
      {/* <div>{errors.userEmail?.message}</div> */}
      {currentLevel === 'first' && <FirstPage setIsAllChecked={setIsAllChecked}></FirstPage>}
      {currentLevel === 'second' && <SecondPage setIsAllChecked={setIsAllChecked} register={register} watch={watch}></SecondPage>}
      {currentLevel === 'third' && <ThirdPage setIsAllChecked={setIsAllChecked} register={register} watch={watch}></ThirdPage>}
      <SubmitBox>
        <button type={currentLevel !== 'first' ? 'submit' : 'button'} disabled={!isAllChecked} onClick={onClickNextPage}>제출</button>
      </SubmitBox>
    </SignUpForm>
  );
};

export default SignupForm;

const SignUpForm = styled(Form)`
  padding: 0 0 ${({ theme }) => theme.rem.p80};
`;

const SubmitBox = styled.div`
  width: 80%;
  height: 50px;
  border: 1px solid #000;
  margin-top: 50px;
`;
