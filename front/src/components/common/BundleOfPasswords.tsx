import React from 'react';
import UserInfoInput from './UserInfoInput';
import { errMsg } from '@/src/utils/singupThirdErrMsg';
import { PASSWORD_REGEX } from '@/src/constant/regex';
import { checkSamePassword, onChangePasswordValidate } from '@/src/utils/checkSamePassword';
import { errorFn } from '@/src/utils/singupErrorFn';
import ErrorMsgBox from './error/ErrorMsgBox';
import { useFormContext } from 'react-hook-form';

const BundleOfPasswords = ({ isNew = false }: { isNew?: boolean }) => {
  const {
    watch,
    register,
    formState: { errors },
    setError,
    clearErrors
  } = useFormContext();

  const Is_ErrColor = Boolean(errors?.password?.message) || Boolean(errors?.confirmPassword?.message);
  return (
    <>
      <UserInfoInput
        small
        type="password"
        inputName={isNew ? '새 비밀번호' : '비밀번호'}
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
        inputName={isNew ? '새 비밀번호 확인' : '비밀번호 확인'}
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
