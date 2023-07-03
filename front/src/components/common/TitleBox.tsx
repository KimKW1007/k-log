import styled, { css } from 'styled-components';
import React from 'react';
import { ChildrenProps } from '@src/types/children';

const Title = ({ children }: ChildrenProps) => {
  const idListPage = children === '해당 이메일로 가입된 아이디';
  return (
    <TitleBox isLogin={children === '로그인' || idListPage} idListPage={idListPage}>
      <h2>{children}</h2>
      {idListPage && <h3>최대 5개까지 생성 가능하며, 새로 만들기를 누르시면 추가 회원가입이 가능합니다.</h3>}
    </TitleBox>
  );
};

export default Title;

const TitleBox = styled.div<{ isLogin?: boolean; idListPage?: boolean }>`
  text-align: center;
  margin: 0 0 ${({ theme }) => theme.rem.p90};
  h2 {
    font-size: ${({ theme }) => theme.rem.p36};
    ${({ idListPage }) =>
      idListPage &&
      css`
        margin-bottom: 20px;
      `}
  }
  h3 {
    word-break: keep-all;
    padding: 0 30px;
    font-weight: 100;
    color: #999;
  }
  ${({ isLogin }) =>
    isLogin &&
    css`
      margin: 0 0 ${({ theme }) => theme.rem.p60};
    `}
`;

const TipBox = styled.div``;
