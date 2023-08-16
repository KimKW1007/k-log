import BundleOfPasswords from '@/src/components/common/BundleOfPasswords';
import CertificateEmail from '@/src/components/common/CertificateEmail';
import FinallPage from '@/src/components/common/FinallPage';
import UserInfoInput from '@/src/components/common/UserInfoInput';
import { InputListBox } from '@/src/components/login/LoginForm';
import { ACCOUNT_ID_REGEX } from '@/src/constant/regex';
import React from 'react';
import { errorFn } from '@/src/utils/singupErrorFn';
import { errMsg } from '@/src/utils/singupThirdErrMsg';
import { FindPasswordProps } from '@/src/types/find';
import { useFormContext } from 'react-hook-form';

const FindPassword = ({ setIsPassCertificate, isPassCertificate, isClickFindBtn, isSuccessChangePassword }: FindPasswordProps) => {
  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext();

  return (
    <InputListBox>
      {isSuccessChangePassword && <FinallPage />}
      {isSuccessChangePassword ||
        (isClickFindBtn ? (
          <BundleOfPasswords isNew />
        ) : (
          <>
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
              errors={`${errorFn(errMsg['userIdRegexMsg'], errors?.userId)}`}
              errColor={Boolean(errors?.userId?.message)}
            />
            <CertificateEmail small setIsPassCertificate={setIsPassCertificate} isPassCertificate={isPassCertificate} />
          </>
        ))}
    </InputListBox>
  );
};

export default FindPassword;
