import BundleOfPasswords from '@components/common/BundleOfPasswords';
import CertificateEmail from '@components/common/CertificateEmail';
import FinallPage from '@components/common/FinallPage';
import UserInfoInput from '@components/common/UserInfoInput';
import { InputListBox } from '@components/login/LoginForm';
import { ACCOUNT_ID_REGEX, PASSWORD_REGEX } from '@constant/regex';
import { CertificateEmailProps } from '@src/types/certificateEmail';
import React from 'react';
import { checkSamePassword, onChangePasswordValidate } from '@utils/checkSamPassword';
import { errorFn } from '@utils/singupErrorFn';
import { errMsg } from '@utils/singupThirdErrMsg';

const FindPassword = ({
  register,
  watch,
  errors,
  setError,
  setValue,
  clearErrors,
  setIsPassCertificate,
  isPassCertificate,
  isClickFindBtn,
  isSuccessChangePassword
}: CertificateEmailProps) => {
  return (
    <InputListBox>
      {isSuccessChangePassword && <FinallPage />}
      {isSuccessChangePassword ||
        (isClickFindBtn ? (
          <BundleOfPasswords register={register} watch={watch} errors={errors} setError={setError} clearErrors={clearErrors} />
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
              errors={errorFn(errMsg['userIdRegexMsg'], errors?.userId)}
              errColor={Boolean(errors?.userId?.message)}
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
          </>
        ))}
    </InputListBox>
  );
};

export default FindPassword;
