import Certificate from '@components/common/Certificate';
import EmailInput from '@components/common/EmailInput';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import customApi from '@utils/customApi';
import { NotFoundByEmail, inputResetBoolean } from '@atoms/atoms';
import { useRecoilState } from 'recoil';
import { useFormContext } from 'react-hook-form';
import { CertificateEmailProps } from '@src/types/certificateEmail';

const CertificateEmail = ({ small, inputName, setIsPassCertificate, isPassCertificate }: CertificateEmailProps) => {
  const [isFailed, setIsFailed] = useRecoilState(NotFoundByEmail);

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
