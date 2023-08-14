import { AllCenterFlex } from '@components/common/CommonFlex';
import React from 'react';
import styled from 'styled-components';
import { SearchOff } from '@styled-icons/material-rounded/SearchOff';

const NoResult = ({ value }: { value: string }) => {
  return (
    <NoResultBox>
      <NoResultIconBox>
        <SearchOff />
      </NoResultIconBox>
      <NoResultTextBox>
        <p>&#34;{value}&#34;</p>
        <p>에 대한 검색결과가 없습니다.</p>
      </NoResultTextBox>
    </NoResultBox>
  );
};

export default NoResult;

const NoResultTextBox = styled(AllCenterFlex)`
  width: 100%;
  flex-wrap: wrap;
  padding: 0 30px;
  line-height: 20px;
  column-gap: 5px;
  p {
    padding: 2px 0;
  }
`;

const NoResultBox = styled.div`
  padding: 50px 0;
  text-align: center;
`;
const NoResultIconBox = styled.div`
  flex-shrink: 0;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  svg {
    width: 50px;
    color: #fff;
  }
`;
