import Certificate from '@components/common/Certificate';
import { InputListBox } from '@components/login/LoginForm';
import EmailInput from '@components/common/EmailInput';
import { RegisterPagesProps } from '@src/types/register';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import customApi from '@utils/customApi';
import { CertificateEmailProps } from '@src/types/certificateEmail';
import { inputResetBoolean } from '@atoms/atoms';
import { useRecoilState } from 'recoil';

const CertificateEmail = ({
  small,
  register,
  watch,
  errors,
  setError,
  setValue,
  clearErrors,
  setIsPassCertificate,
  isPassCertificate
}: CertificateEmailProps) => {
  const [isComplete, setIsComplete] = useState(false);
  const [resetState, setResetState] = useRecoilState(inputResetBoolean);

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
    if (!watch('userEmail')) {
      setError('userEmail', {
        type: 'custom',
        message: '값을 입력해주세요'
      });
      return;
    }
    if (errors?.userEmail?.message) {
      return;
    }
    mutate({ userEmail: watch('userEmail') });
    setValue!('token', '');
    clearErrors('token');
  };

  useEffect(() => {
    setIsComplete(false);
  }, [resetState]);

  return (
    <>
      <EmailInput
        small={small}
        register={register}
        watch={watch('userEmail')}
        errors={errors?.userEmail?.message}
        errColor={Boolean(errors?.userEmail?.message)}
        isLoading={isLoading}
        certificateEmail={certificateEmail}
        isPassCertificate={isPassCertificate}
        isComplete={isComplete}
      />
      {isComplete && (
        <Certificate
          register={register}
          watch={watch}
          isPassCertificate={isPassCertificate}
          setIsPassCertificate={setIsPassCertificate}
          errors={errors}
          setError={setError}
          clearErrors={clearErrors}></Certificate>
      )}
    </>
  );
};

export default CertificateEmail;
