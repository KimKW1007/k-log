import React from 'react';
import styled, { css } from 'styled-components';
import { ErrMsg, ErrMsgBox } from './UserInfoInput';
import { useFormContext } from 'react-hook-form';
import customApi from '@utils/customApi';
import { ExclamationCircleFill, ExclamationDiamondFill } from '@styled-icons/bootstrap';
import { CertificateEmailProps } from '@src/types/certificateEmail';
import CertificateBtnBox from './CertificateBtnBox';

const Certificate = ({ setIsPassCertificate, isPassCertificate }: CertificateEmailProps) => {
  const {
    register,
    watch,
    formState: { errors },
    setError
  } = useFormContext();

  const { postApi } = customApi('/find/certificate');
  const certificateToken = async () => {
    if (!watch('token')) {
      setError('token', { type: 'custom', message: '값을 입력해주세요' });
      return;
    }
    if (errors?.token?.message) return;
    await postApi({ userEmail: watch('userEmail'), token: watch('token') })
      .then((res) => {
        setIsPassCertificate(true);
      })
      .catch((e) => {
        setError('token', { type: 'custom', message: '인증번호가 일치하지 않습니다.' });
      });
  };

  return (
    <>
      {isPassCertificate || (
        <CertBox errColor={Boolean(errors?.token?.message)}>
          <CertInput
            placeholder="인증번호"
            {...register('token', {
              required: '값을 입력해주세요',
              validate: {
                checkRegex: (value) => /^[0-9]{4,7}$/.test(value!) || '4~7자리 숫자만 입력하세요.'
              }
            })}
            autoComplete="off"
          />
          <CertificateBtnBox onClick={certificateToken}>인증하기</CertificateBtnBox>
        </CertBox>
      )}
      {(errors?.token?.message || isPassCertificate) && (
        <ErrMsgBox errColor={Boolean(errors?.token?.message)}>
          {(errors?.token?.message && <ExclamationDiamondFill />) || (isPassCertificate && <ExclamationCircleFill />)}
          <ErrMsg>{errors?.token?.message ? `${errors?.token?.message}` : isPassCertificate && '인증되었습니다'}</ErrMsg>
        </ErrMsgBox>
      )}
    </>
  );
};

export default Certificate;

const CertInput = styled.input`
  position: relative;
  z-index: 2;
  width: 100%;
  line-height: 40px;
  padding: 10px 100px 10px 12px;
  outline: none;
  border-bottom: 2px solid #d5d5d5;
  font-size: 16px;
  transition: 0.3s;
  font-weight: bold;

  &::placeholder {
    font-size: 14px;
  }
  &:focus {
    border-bottom: 2px solid #000;
  }
`;

const CertBox = styled.div<{ errColor?: boolean }>`
  position: relative;
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  overflow: hidden;
  ${({ errColor, theme }) =>
    errColor &&
    css`
      background: ${theme.color.err}1a;
      ${CertInput} {
        border-bottom: 2px solid ${theme.color.err}8a;
      }
    `}
`;

// ${({ theme }) => theme.color.err}
