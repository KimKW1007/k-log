import CertificateEmail from '@components/common/CertificateEmail'
import UserInfoInput from '@components/common/UserInfoInput'
import { InputListBox } from '@components/login/LoginForm'
import { ACCOUNT_ID_REGEX } from '@src/constant/regex'
import { CertificateEmailProps } from '@src/types/CertificateEmail'
import React from 'react'
import { errorFn } from 'utils/singupErrorFn'
import { errMsg } from 'utils/singupThirdErrMsg'

const FindPassword = ({ register, watch, errors, setError, setValue, clearErrors, setIsPassCertificate, isPassCertificate, isClickFindBtn, userIds }: CertificateEmailProps) => {
  return (
    <InputListBox>
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
    </InputListBox>
  )
}

export default FindPassword