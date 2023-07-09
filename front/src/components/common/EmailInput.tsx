import { CertificateBtn, CertificateBtnBox, CurrentInputName, ErrMsg, ErrMsgBox, Input, InputBox } from '@components/common/UserInfoInput';
import { EMAIL_REGEX } from '@constant/regex';
import { RegisterInputs, UserInfoInputProps } from '@src/types/user';
import { ExclamationCircleFill, ExclamationDiamondFill } from '@styled-icons/bootstrap';
import React, { useEffect, useState } from 'react';
import { UseFormRegister, useFormContext } from 'react-hook-form';
import styled, { css } from 'styled-components';
import ErrorMsgBox from './error/ErrorMsgBox';

interface EmailProps extends Omit<UserInfoInputProps, 'register' | 'type' | 'inputName'> {
  inputName?: string;
  isComplete: boolean;
  isLoading: boolean;
  certificateEmail: () => void;
  isPassCertificate?: boolean;
}

const EmailInput = ({ inputName = '이메일', watch,  small = false, errColor, errors, isComplete, isLoading = false, certificateEmail, isPassCertificate }: EmailProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const { register } = useFormContext();

  useEffect(() => {
    watch ? setIsFocus(true) : setIsFocus(false);
  }, [watch]);
  return (
    <React.Fragment>
      <OuterBox>
        <InputBox errColor={errColor} className={isLoading || isComplete ? 'certified' : ''}>
          <CurrentInputName className={isFocus ? 'high' : ''} small={small}>
            {inputName}
          </CurrentInputName>
          <Input
            small={small}
            bold={true}
            isEmail
            type="text"
            {...register('userEmail', {
              required: '값을 입력해주세요',
              validate: {
                checkEmailValidate: (value) => EMAIL_REGEX.test(value!) || '이메일 형식에 맞지 않습니다'
              }
            })}
            onFocus={() => {
              setIsFocus(true);
            }}
            onBlur={() => {
              !watch && setIsFocus(false);
            }}
            autoComplete="off"
          />
        </InputBox>
        {isPassCertificate || (
          <CertificateBtnBox>
            <CertificateBtn type="button" onClick={certificateEmail}>
              {isLoading ? '전송 중' : isComplete ? '재전송' : '인증번호 받기'}
            </CertificateBtn>
          </CertificateBtnBox>
        )}
      </OuterBox>
      {errors && <ErrorMsgBox errColor={errColor} errors={errors} />}
    </React.Fragment>
  );
};

export default EmailInput;

const OuterBox = styled.div`
  position: relative;
  width: 100%;
  margin-top: ${({ theme }) => theme.rem.p20};
`;
