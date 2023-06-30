import { CertificateBtn, CertificateBtnBox, CurrentInputName, ErrMsg, ErrMsgBox, Input, InputBox } from '@components/common/UserInfoInput';
import { EMAIL_REGEX } from '@src/constant/regex';
import { RegisterInputs, UserInfoInputProps } from '@src/types/user';
import { ExclamationCircleFill, ExclamationDiamondFill } from '@styled-icons/bootstrap';
import React, { useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import styled, { css } from 'styled-components';


interface EmailProps extends Omit<UserInfoInputProps, "register" | "type" | "inputName">{
  inputName ?: string;
  isSuccess : boolean;
  isLoading : boolean;
  certificateEmail: () => void
  isPassCertificate ?: boolean;
  register: UseFormRegister<RegisterInputs>
}


const EmailInput = ({ inputName = '이메일', watch, register, small = false, errColor, errors, isSuccess  = false, isLoading  = false, certificateEmail, isPassCertificate }: EmailProps) => {
  const [isFocus, setIsFocus] = useState(false);



  useEffect(() => {
    watch ? setIsFocus(true) : setIsFocus(false);
  }, [watch]);
  return (
    <React.Fragment>
      <OuterBox>
        <InputBox errColor={errColor} className={(isLoading || isSuccess) ? 'certified' : ""}>
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
            
          />
        </InputBox>
        {isPassCertificate || <CertificateBtnBox>
          <CertificateBtn type="button" onClick={certificateEmail} >
            {isLoading ? "전송 중" : isSuccess ? "재전송" : '인증번호 받기'}
          </CertificateBtn>
        </CertificateBtnBox>}
      </OuterBox>
      {errors && (
        <ErrMsgBox errColor={errColor}>
          {errColor ? <ExclamationDiamondFill /> : <ExclamationCircleFill />}
          <ErrMsg>{errors}</ErrMsg>
        </ErrMsgBox>
      )}
    </React.Fragment>
  );
};

export default EmailInput;


const OuterBox = styled.div`
  position: relative;
  width:100%;
  margin-top: ${({ theme }) => theme.rem.p20};
`