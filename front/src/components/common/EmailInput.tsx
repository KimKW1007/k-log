import { CurrentInputName, ErrMsg, ErrMsgBox, Input, InputBox } from '@components/common/UserInfoInput';
import { EMAIL_REGEX } from '@constant/regex';
import { UserInfoInputProps } from '@src/types/user';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled, { css, keyframes } from 'styled-components';
import ErrorMsgBox from './error/ErrorMsgBox';
import { Reload } from '@styled-icons/ionicons-solid/Reload';
import CertificateBtnBox from './CertificateBtnBox';

interface EmailProps extends Omit<UserInfoInputProps, 'register' | 'type' | 'inputName'> {
  inputName?: string;
  isComplete: boolean;
  isLoading: boolean;
  certificateEmail: () => void;
  isPassCertificate: boolean;
  onClickRewrite: () => void;
}

const EmailInput = ({ inputName = '이메일', watch, small = false, errColor, errors, isComplete, isLoading = false, certificateEmail, isPassCertificate, onClickRewrite }: EmailProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const { register, setValue } = useFormContext();
  useEffect(() => {
    watch ? setIsFocus(true) : setIsFocus(false);
  }, [watch]);
  return (
    <React.Fragment>
      <OuterBox>
        <InnerBox isComplete={isComplete}>
          <InputBox errColor={errColor} className={isLoading || isComplete ? 'certified' : ''}>
            <Input
              small={small}
              bold={true}
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
            <CurrentInputName className={isFocus ? 'high' : ''} small={small}>
              {inputName}
            </CurrentInputName>
          </InputBox>
          {isPassCertificate || <CertificateBtnBox onClick={certificateEmail}>{isLoading ? '전송 중' : isComplete ? '재전송' : '인증번호 받기'}</CertificateBtnBox>}
        </InnerBox>
        <RewriteBtn type="button" title="재작성" onClick={onClickRewrite} isComplete={isComplete}>
          <span className="blind">재작성</span>
          <Reload></Reload>
        </RewriteBtn>
      </OuterBox>
      {errors && <ErrorMsgBox errColor={errColor} errors={errors} />}
    </React.Fragment>
  );
};

export default EmailInput;

const RewriteDisplayAni = keyframes`
  100%{
    opacity: 1;
  }
`;

const RewriteBtn = styled.button<{ isComplete: boolean }>`
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -15px;
  width: 30px;
  height: 30px;
  padding: 5px;
  border-radius: 50%;
  background: #898989;
  box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.4) inset;
  display: none;
  opacity: 0;
  svg {
    color: #fff;
    width: 100%;
  }
  ${({ isComplete }) =>
    isComplete &&
    css`
      animation: ${RewriteDisplayAni} 0.3s 0.1s forwards;
      display: block;
    `}
`;

const OuterBox = styled.div`
  position: relative;
  width: 100%;
  margin-top: 20px;
  display: flex;
`;

const InnerBox = styled.div<{ isComplete: boolean }>`
  position: relative;
  width: 100%;
  transition: width 0.2s;
  ${({ isComplete }) =>
    isComplete &&
    `
  width: calc(100% - 40px);
`}
`;
