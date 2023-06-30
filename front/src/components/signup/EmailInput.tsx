import { CertificateBtn, CertificateBtnBox, CurrentInputName, ErrMsg, ErrMsgBox, Input, InputBox } from '@components/common/UserInfoInput';
import { UserInfoInputProps } from '@src/types/user';
import { ExclamationCircleFill, ExclamationDiamondFill } from '@styled-icons/bootstrap';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';


interface EmailProps extends UserInfoInputProps{
  isSuccess : boolean;
  isLoading : boolean;
  certificateEmail: () => void
  isPassCertificate ?: boolean;
}


const EmailInput = ({ type, inputName, watch, register, bold = false, small = false, errColor, errors, isSuccess, isLoading, certificateEmail, isPassCertificate }: EmailProps) => {
  const [isFocus, setIsFocus] = useState(false);



  useEffect(() => {
    watch && setIsFocus(true);
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
            bold={bold}
            type={type}
            {...register}
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