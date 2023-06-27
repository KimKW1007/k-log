import { InputsBox } from '@components/common/InputsBox';
import UserInfoInput from '@components/common/UserInfoInput';
import { ChildrenProps } from '@components/layout/Layout';
import { EMAIL_REGEX } from '@src/constant/regex';
import React, { useEffect, useState } from 'react';
import { FieldValues, UseFormRegister, UseFormRegisterReturn, UseFormWatch } from 'react-hook-form';
import { Inputs } from './signupForm';


export interface RegisterPagesProps{
  register: UseFormRegister<Inputs>
  watch: UseFormWatch<Inputs>
  setIsAllChecked : React.Dispatch<React.SetStateAction<boolean>>
}


const SecondPage = ({ register, watch, setIsAllChecked } : RegisterPagesProps) => {


  return (
    <InputsBox>
      <UserInfoInput small bold type="text" inputName="닉네임" register={register('userName', { required: true })} watch={watch('userName')} />
      <UserInfoInput
        small
        bold
        type="text"
        inputName="이메일"
        register={register('userEmail', {
          required: true,
          validate: {
            checkEmailValidate: (value) => EMAIL_REGEX.test(value!) || '이메일 형식에 맞지 않습니다'
          }
        })}
        watch={watch('userEmail')}
      />
    </InputsBox>
  );
};

export default SecondPage;