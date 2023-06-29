import React from 'react';
import styled, { css } from 'styled-components';
import { EmptyBox } from './FirstPage';

export interface User {
  id?: string;
  userId?: string;
  userEmail?: string;
  userName?: string;
}
export interface UserIds {
  userIds?: User[];
}

const CheckIdByEmailPage = ({ userIds }: UserIds) => {
  return (
    <React.Fragment>
      <AccountsBox>
        {userIds && userIds.length >= 1 ? 
          userIds.map(({ id, userId }) => (
            <p key={id}>{userId}</p>
          ))
        :
        <p>가입된 아이디가 없습니다</p>
        }
      </AccountsBox>
      <EmptyBox />
    </React.Fragment>
  );
};

export default CheckIdByEmailPage;

const AccountsBox = styled.div`
  width: 100%;
  p {
    font-size: ${({ theme }) => theme.rem.p26};
    text-align: center;
    padding: ${({ theme }) => theme.rem.p10};
  }
`;
