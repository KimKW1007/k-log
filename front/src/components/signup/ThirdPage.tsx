import React, { useEffect } from 'react';
import UserInfoInput from '@components/common/UserInfoInput';
import { ACCOUNT_ID_REGEX, EMAIL_REGEX, PASSWORD_REGEX } from '@src/constant/regex';
import { FieldError, UseFormClearErrors, UseFormSetError } from 'react-hook-form';
import { InputListBox } from '@components/login/LoginForm';
import { RegisterPagesProps } from '@src/types/register';
import { errMsg } from 'utils/singupThirdErrMsg';
import { errorFn } from 'utils/singupErrorFn';


const ThirdPage = ({ register, watch, setIsAllChecked, errors, setError, clearErrors }: RegisterPagesProps) => {
  const checkSamePassword = () => {
    // 2단계 : 두개의 password 입력란이 안 비워져있는지
    if (watch('confirmPassword') && watch('password')!.length >= 8 && watch('confirmPassword')!.length >= 1) {
      // 3단계 : 두개의 password가 같은지
      if (watch('password') === watch('confirmPassword')) {
        return '비밀번호가 일치합니다.';
      }
      return '비밀번호가 일치하지 않습니다.';
    }
  };

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
          onChange: () => {
            if (watch('confirmPassword')!.length >= 8) {
              if (watch('password') !== watch('confirmPassword')) {
                // 실질적으로 보이진 않고 에러관련 boolean으로 사용
                setError('confirmPassword', {
                  type: 'custom',
                  message: '비밀번호가 일치하지 않습니다.'
                });
              } else {
                clearErrors(['password', 'confirmPassword']);
              }
            }
          }
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
          validate: {
            // 실질적으로 보이진 않고 에러관련 boolean으로 사용
            checkPasswordValidate: (value) => watch('password') === value || errMsg['passwordRegexMsg']
          }
        })}
        watch={watch('confirmPassword')}
        errors={checkSamePassword() || errorFn(errMsg['passwordRegexMsg'], errors?.password, errors?.confirmPassword)}
        errColor={Boolean(errors?.confirmPassword?.message)}
      />
    </InputListBox>
  );
};

export default ThirdPage;
