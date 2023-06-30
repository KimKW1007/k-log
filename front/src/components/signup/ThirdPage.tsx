import React, { useEffect } from 'react';
import UserInfoInput from '@components/common/UserInfoInput';
import { ACCOUNT_ID_REGEX, EMAIL_REGEX, PASSWORD_REGEX } from '@src/constant/regex';
import { FieldError, UseFormClearErrors, UseFormSetError } from 'react-hook-form';
import { InputListBox } from '@components/login/LoginForm';
import { RegisterPagesProps } from '@src/types/register';
import { errMsg } from 'utils/singupThirdErrMsg';
import { errorFn } from 'utils/singupErrorFn';
import { checkSamePassword, onChangePasswordValidate } from 'utils/checkSamPassword';
import BundleOfPasswords from '@components/common/BundleOfPasswords';


const ThirdPage = ({ register, watch, setIsAllChecked, errors, setError, clearErrors }: RegisterPagesProps) => {
 

  useEffect(() => {
    if (watch('userId') && watch('password') && watch('confirmPassword')) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [watch('userId'), watch('password'), watch('confirmPassword')]);
  return (
    <InputListBox>
      <UserInfoInput
        small
        bold
        type="text"
        inputName="아이디"
        register={register('userId', {
          required: '값을 입력해주세요',
          minLength: {
            value: 4,
            message: errMsg['userIdMinLength']
          },
          validate: {
            checkAccountId: (value) => ACCOUNT_ID_REGEX.test(value!) || errMsg['userIdRegexMsg']
          }
        })}
        watch={watch('userId')}
        errors={errorFn(errMsg['userIdRegexMsg'], errors?.userId)}
        errColor={Boolean(errors?.userId?.message)}
      />
      <BundleOfPasswords register={register} watch={watch} errors={errors} setError={setError} clearErrors={clearErrors} />
    </InputListBox>
  );
};

export default ThirdPage;
