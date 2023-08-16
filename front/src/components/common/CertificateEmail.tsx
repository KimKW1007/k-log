import Certificate from '@/src/components/common/Certificate';
import EmailInput from '@/src/components/common/EmailInput';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import customApi from '@/src/utils/customApi';
import { NotFoundByEmail, inputResetBoolean } from '@/src/atoms/atoms';
import { useRecoilState } from 'recoil';
import { useFormContext } from 'react-hook-form';
import { CertificateEmailProps } from '@/src/types/certificateEmail';

const CertificateEmail = ({ small, inputName, setIsPassCertificate, isPassCertificate }: CertificateEmailProps) => {
  const [isFailed, setIsFailed] = useRecoilState(NotFoundByEmail);

  const [isComplete, setIsComplete] = useState(false);
  const [resetState, setResetState] = useRecoilState(inputResetBoolean);

  const { postApi: certificatePostApi } = customApi('/find/sendEmail');
  const { mutate, isLoading, isSuccess } = useMutation(certificatePostApi, {
    onSuccess(data, variables, context) {
      setIsComplete(true);
    }
  });
  const {
    register,
    watch,
    formState: { errors },
    setError,
    setValue,
    clearErrors
  } = useFormContext();

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

  const onClickRewrite = () => {
    setIsPassCertificate(false);
    setIsComplete(false);
    setValue!('token', '');
  };

  useEffect(() => {
    setIsFailed(false);
  }, [watch(['userName', 'userEmail'])]);

  useEffect(() => {
    if (isFailed) {
      onClickRewrite();
    }
  }, [isFailed]);

  useEffect(() => {
    setIsComplete(false);
  }, [resetState]);

  return (
    <>
      <EmailInput
        small={small}
        inputName={inputName}
        watch={watch('userEmail')}
        errors={errors?.userEmail?.message}
        errColor={Boolean(errors?.userEmail?.message)}
        isLoading={isLoading}
        certificateEmail={certificateEmail}
        isPassCertificate={isPassCertificate}
        isComplete={isComplete}
        onClickRewrite={onClickRewrite}
      />
      {isComplete && <Certificate isPassCertificate={isPassCertificate} setIsPassCertificate={setIsPassCertificate}></Certificate>}
    </>
  );
};

export default CertificateEmail;
