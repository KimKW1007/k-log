import CertificateEmail from '@components/common/CertificateEmail';
import IdListByEmail from '@components/common/IdListByEmail';
import { InputListBox } from '@components/login/LoginForm';
import { CertificateEmailProps } from '@src/types/certificateEmail';
import React from 'react'


const FindId = ({ register, watch, errors, setError, setValue, clearErrors, setIsPassCertificate, isPassCertificate, isClickFindBtn, userIds }: CertificateEmailProps) => {
  return (
    <>
    {isClickFindBtn ? (
      <IdListByEmail userIds={userIds}></IdListByEmail>
    ) : (
      <InputListBox>
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
    )}
    </>
  )
}

export default FindId