import React from 'react';
import UserInfoInput, { ErrMsg, ErrMsgBox } from './UserInfoInput';
import { errMsg } from '@utils/singupThirdErrMsg';
import { PASSWORD_REGEX } from '@constant/regex';
import { checkSamePassword, onChangePasswordValidate } from '@utils/checkSamePassword';
import { errorFn } from '@utils/singupErrorFn';
import ErrorMsgBox from './error/ErrorMsgBox';
import { useFormContext } from 'react-hook-form';

const BundleOfPasswords = () => {
  const {watch, register, formState: { errors }, setError, clearErrors} = useFormContext();

  const Is_ErrColor = Boolean(errors?.password?.message) || Boolean(errors?.confirmPassword?.message);
  return (
    <>
      <UserInfoInput
        small
        type="password"
        inputName="비밀번호"
        register={register('password', {
          required: errMsg['passwordMinLength'],
          minLength: {
            value: 8,
            message: errMsg['passwordMinLength']
          },
          validate: {
            checkPasswordValidate: (value) => PASSWORD_REGEX.test(value!) || errMsg['passwordRegexMsg']
          },
          onChange: onChangePasswordValidate({ watch, setError, clearErrors })
        })}
        watch={watch('password')}
        errColor={Boolean(errors?.password?.message)}
      />
      <UserInfoInput
        small
        type="password"
        inputName="비밀번호 확인"
        register={register('confirmPassword', {
          required: errMsg['passwordMinLength'],
          minLength: {
            value: 8,
            message: errMsg['passwordMinLength']
          },
          validate: {
            // 실질적으로 보이진 않고 에러관련 boolean으로 사용
            checkPasswordValidate: (value) => watch('password') === value || errMsg['passwordRegexMsg'],
            checkPasswordValidate2: (value) => PASSWORD_REGEX.test(value!) || errMsg['passwordRegexMsg']
          }
        })}
        watch={watch('confirmPassword')}
        errColor={Boolean(errors?.confirmPassword?.message)}
      />
      {errors && <ErrorMsgBox errColor={Is_ErrColor} errors={checkSamePassword(watch) || errorFn(errMsg['passwordRegexMsg'], errors?.password, errors?.confirmPassword)} />}
    </>
  );
};

export default BundleOfPasswords;
