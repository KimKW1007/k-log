import React from 'react';
import styled, { css } from 'styled-components';
import { CertificateBtn, CertificateBtnBox, ErrMsg, ErrMsgBox } from './UserInfoInput';
import { useForm } from 'react-hook-form';
import customApi from '@utils/customApi';
import { ExclamationCircleFill, ExclamationDiamondFill } from '@styled-icons/bootstrap';
import { RegisterPagesProps } from '@src/types/register';

const Certificate = ({
  register,
  watch,
  setIsPassCertificate,
  isPassCertificate,
  errors,
  setError,
  clearErrors
}: Omit<RegisterPagesProps, 'setIsAllChecked'>) => {
  const { postApi } = customApi('/find/certificate');
  const certificateToken = async () => {
    if (!watch('token')) {
      setError('token', { type: 'custom', message: '값을 입력해주세요' });
      return;
    }
    if (errors?.token?.message) return;
    await postApi({ userEmail: watch('userEmail'), token: watch('token') })
      .then((res) => {
        console.log({ res });
        setIsPassCertificate!(true);
      })
      .catch((e) => {
        console.log({ e });
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
                checkRegex: (value) => /^[0-9]{4,6}$/.test(value!) || '4~6자리 숫자만 입력하세요.'
              }
            })}
          />
          <CertificateBtnBox>
            <CertificateBtn type="button" onClick={certificateToken}>
              인증하기
            </CertificateBtn>
          </CertificateBtnBox>
        </CertBox>
      )}
      {(errors?.token?.message || isPassCertificate) && (
        <ErrMsgBox errColor={Boolean(errors?.token?.message)}>
          {(errors?.token?.message && <ExclamationDiamondFill />) || (isPassCertificate && <ExclamationCircleFill />)}
          <ErrMsg>{errors?.token?.message || (isPassCertificate && '인증되었습니다')}</ErrMsg>
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
  line-height: ${({ theme }) => theme.rem.p40};
  padding: ${({ theme }) => theme.rem.p10} ${({ theme }) => theme.rem.p100} ${({ theme }) => theme.rem.p10} ${({ theme }) => theme.rem.p12};
  outline: none;
  border-bottom: 2px solid #d5d5d5;
  font-size: ${({ theme }) => theme.rem.p16};
  transition: 0.3s;
  font-weight: bold;

  &::placeholder {
    font-size: ${({ theme }) => theme.rem.p14};
  }
  &:focus {
    border-bottom: 2px solid #000;
  }
`;

const CertBox = styled.div<{ errColor?: boolean }>`
  position: relative;
  width: 100%;
  margin-top: ${({ theme }) => theme.rem.p10};
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
