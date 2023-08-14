import React from 'react';
import styled from 'styled-components';
import Loading from './Loading';
import { AllCenterFlex } from '../CommonFlex';

const LoadingText = ({ children = '로딩 중' }: { children?: React.ReactNode }) => {
  return (
    <LoadingWrap>
      <LoadingContainer>
        <Loading isCustom />
        <LoadingTextBox>{children}</LoadingTextBox>
      </LoadingContainer>
    </LoadingWrap>
  );
};

export default LoadingText;

const LoadingWrap = styled(AllCenterFlex)`
  width: 100%;
  height: 100%;
`;

const LoadingContainer = styled(AllCenterFlex)`
  flex-direction: column;
  width: 100px;
  height: 100px;
`;

const LoadingTextBox = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.color.err};
`;
