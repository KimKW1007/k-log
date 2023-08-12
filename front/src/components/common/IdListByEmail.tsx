import React from 'react';
import styled, { css } from 'styled-components';
import { UserIds } from '@src/types/user';

const IdListByEmail = ({ userIds }: UserIds) => {
  return (
    <React.Fragment>
      <AccountsBox>
        {userIds && userIds.length >= 1 ? userIds.map(({ id, userId }) => <p key={'userIds' + id}>{userId}</p>) : <p>가입된 아이디가 없습니다</p>}
      </AccountsBox>
    </React.Fragment>
  );
};

export default IdListByEmail;

const AccountsBox = styled.div`
  width: 100%;
  p {
    font-size: ${({ theme }) => theme.rem.p26};
    text-align: center;
    padding: ${({ theme }) => theme.rem.p10};
  }
`;
