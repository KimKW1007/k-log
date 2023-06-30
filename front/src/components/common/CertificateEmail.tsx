import Certificate from '@components/common/Certificate';
import { InputListBox } from '@components/login/LoginForm';
import EmailInput from '@components/common/EmailInput';
import { RegisterPagesProps } from '@src/types/register';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled from 'styled-components';
import customApi from 'utils/customApi';
import { CertificateEmailProps } from '@src/types/CertificateEmail';



const CertificateEmail = ({ small, register, watch, errors, setError, setValue, clearErrors, setIsPassCertificate, isPassCertificate }: CertificateEmailProps) => {
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
    if (isSuccess) {
      setIsPassCertificate!(false);
    }
  };
  return (
    <>
      <EmailInput
        small={small}
        register={register}
        watch={watch('userEmail')}
        errors={errors?.userEmail?.message}
        errColor={Boolean(errors?.userEmail?.message)}
        isSuccess={isSuccess}
        isLoading={isLoading}
        certificateEmail={certificateEmail}
        isPassCertificate={isPassCertificate}
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
