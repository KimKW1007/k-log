import UserInfoInput from '@components/common/UserInfoInput';
import { NAME_REGEX } from '@src/constant/regex';
import React, { useEffect, useState } from 'react';
import { InputListBox } from '@components/login/LoginForm';
import customApi from 'utils/customApi';
import { useMutation } from '@tanstack/react-query';
import { RegisterPagesProps } from '@src/types/register';
import CertificateEmail from '@components/common/CertificateEmail';

const SecondPage = ({
  register,
  watch,
  setIsAllChecked,
  errors,
  setIsPassCertificate,
  isPassCertificate,
  setValue,
  setError,
  clearErrors
}: RegisterPagesProps) => {
  const [isComplete, setIsComplete] = useState(false);

  const { postApi: certificatePostApi } = customApi('/find/sendEmail');
  const { mutate, isLoading, isSuccess } = useMutation(certificatePostApi, {
    onError(error, variables, context) {
      console.log({ error });
    },
    onSuccess(data, variables, context) {
      setIsComplete(true);
      setIsPassCertificate!(false);
    }
  });

  useEffect(() => {
    if (watch('userName') && watch('userEmail') && watch('token') && isPassCertificate) {
      setIsAllChecked!(true);
    } else {
      setIsAllChecked!(false);
    }
  }, [watch('userName'), watch('userEmail'), watch('token'), isPassCertificate]);
  return (
    <>
      <InputListBox>
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
        <CertificateEmail
          small
          register={register}
          watch={watch}
          errors={errors}
          setError={setError}
          setValue={setValue}
          clearErrors={clearErrors}
          setIsPassCertificate={setIsPassCertificate}
          isPassCertificate={isPassCertificate}
        />
      </InputListBox>
    </>
  );
};

export default SecondPage;
