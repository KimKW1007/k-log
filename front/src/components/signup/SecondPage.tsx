import UserInfoInput from '@components/common/UserInfoInput';
import { ACCOUNT_ID_REGEX, EMAIL_REGEX, NAME_REGEX } from '@src/constant/regex';
import React, { useEffect, useState } from 'react';
import { FieldError, FieldErrors, UseFormClearErrors, UseFormRegister, UseFormSetError, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Inputs } from './signupForm';
import { InputsBox } from '@components/login/LoginForm';
import { EmptyBox } from './FirstPage';
import Certificate from '@components/common/Certificate';
import EmailInput from './EmailInput';
import customApi from 'utils/customApi';
import { useMutation } from '@tanstack/react-query';

export interface RegisterPagesProps {
  register: UseFormRegister<Inputs>;
  watch: UseFormWatch<Inputs>;
  setIsAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
  errors?: FieldErrors<Inputs>;
  setIsPassCertificate?: React.Dispatch<React.SetStateAction<boolean>>;
  isPassCertificate?: boolean;
  setValue?: UseFormSetValue<Inputs>;
  setError: UseFormSetError<Inputs>;
  clearErrors: UseFormClearErrors<Inputs>;
}

const SecondPage = ({ register, watch, setIsAllChecked, errors, setIsPassCertificate, isPassCertificate, setValue, setError, clearErrors }: RegisterPagesProps) => {
  const [isComplete, setIsComplete] = useState(false);

  const { postApi: certificatePostApi } = customApi('/find/sendEmail');
  const { mutate, isLoading, isSuccess } = useMutation(certificatePostApi, {
    onError(error, variables, context) {
      console.log({ error });
    },
    onSuccess(data, variables, context) {
      setIsComplete(true);
    }
  });

  const certificateEmail = () => {
    if (errors?.userEmail?.message) {
      return;
    }
    mutate({ userEmail: watch('userEmail') });
      setValue!('token', '');
      setIsPassCertificate!(true);
      if (isSuccess) {
      setIsPassCertificate!(false);
    }
  };

  useEffect(() => {
    if (watch('userName') && watch('userEmail') && isPassCertificate) {
      setIsAllChecked!(true);
    } else {
      setIsAllChecked!(false);
    }
  }, [watch('userName'), watch('userEmail'), isPassCertificate]);
  console.log({ errors });
  return (
    <>
      <InputsBox>
        <UserInfoInput
          small
          bold
          type="text"
          inputName="이름"
          register={register('userName', {
            required: '값을 입력해주세요',
            validate: {
              checkNameValidate: (value) => NAME_REGEX.test(value!) || '2~4자의 한글,영문만 입력해주세요.'
            }
          })}
          watch={watch('userName')}
          errors={errors?.userName?.message}
          errColor={Boolean(errors?.userName?.message)}
        />
        <EmailInput
          small
          bold
          type="text"
          inputName="이메일"
          register={register('userEmail', {
            required: '값을 입력해주세요',
            validate: {
              checkEmailValidate: (value) => EMAIL_REGEX.test(value!) || '이메일 형식에 맞지 않습니다'
            }
          })}
          watch={watch('userEmail')}
          errors={errors?.userEmail?.message}
          errColor={Boolean(errors?.userEmail?.message)}
          isSuccess={isSuccess}
          isLoading={isLoading}
          certificateEmail={certificateEmail}
        />
        {isComplete && <Certificate register={register} watch={watch} setIsAllChecked={setIsAllChecked} isPassCertificate={isPassCertificate} setIsPassCertificate={setIsPassCertificate} errors={errors} setError={setError} clearErrors={clearErrors}></Certificate>}
      </InputsBox>
      <EmptyBox />
    </>
  );
};

export default SecondPage;
