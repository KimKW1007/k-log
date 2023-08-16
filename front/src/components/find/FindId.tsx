import CertificateEmail from '@/src/components/common/CertificateEmail';
import IdListByEmail from '@/src/components/common/IdListByEmail';
import { InputListBox } from '@/src/components/login/LoginForm';
import { FindIdProps } from '@/src/types/find';
import React from 'react';

const FindId = ({ isClickFindBtn, userIds, setIsPassCertificate, isPassCertificate }: FindIdProps) => {
  return (
    <>
      {isClickFindBtn ? (
        <IdListByEmail userIds={userIds}></IdListByEmail>
      ) : (
        <InputListBox>
          <CertificateEmail small setIsPassCertificate={setIsPassCertificate} isPassCertificate={isPassCertificate} />
        </InputListBox>
      )}
    </>
  );
};

export default FindId;
