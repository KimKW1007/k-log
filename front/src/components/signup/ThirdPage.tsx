import React from 'react'
import { Inputs } from './signupForm'
import { UseFormRegister, UseFormWatch } from 'react-hook-form'
import { InputsBox } from '@components/common/InputsBox'
import UserInfoInput from '@components/common/UserInfoInput'
import { ACCOUNT_ID_REGEX } from '@src/constant/regex'
import { RegisterPagesProps } from './SecondPage'



const ThirdPage = ({ register, watch, setIsAllChecked } : RegisterPagesProps) => {
  return (
    <InputsBox>
        <UserInfoInput
          small
          bold
          type="text"
          inputName="아이디"
          register={register('userId', {
            required: true,
            validate: {
              checkAccountId: (value) => ACCOUNT_ID_REGEX.test(value!) || '아이디는 6글자이상으로 입력해주세요'
            }
          })}
          watch={watch('userId')}
        />
        <UserInfoInput small type="password" inputName="비밀번호" register={register('password', { required: true })} watch={watch('password')} />
        <UserInfoInput small type="password" inputName="비밀번호 확인" register={register('confirmPassword', { required: true })} watch={watch('confirmPassword')} />
      </InputsBox>
  )
}

export default ThirdPage