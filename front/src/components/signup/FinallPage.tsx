import React from 'react';
import styled from 'styled-components';
import { FlexEmptyBox } from './FirstPage';

const FinallPage = () => {
  return (
    <FinallBox>
      <FinalText>&#40;준비중&#41; 일단 가입을 축하한다.</FinalText>
      <FlexEmptyBox />
    </FinallBox>
  );
};

export default FinallPage;

const FinallBox = styled.div``;

const FinalText = styled.span``;
