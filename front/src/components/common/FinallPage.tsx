import React from 'react';
import styled from 'styled-components';

const FinallPage = ({ isSignupFinal = false }: { isSignupFinal?: boolean }) => {
  return (
    <FinalBox>
      {isSignupFinal ? (
        <FinalText>
          <p>회원가입을 진심으로 축하합니다.</p>
          <p><strong>K-log</strong> 로그인하러 가볼까요?</p>
        </FinalText>
      ) : (
        <FinalText>
          <p>비밀번호 변경이 완료되었습니다.</p>
          <p><strong>K-log</strong> 로그인하러 가볼까요?</p>
        </FinalText>
      )}
    </FinalBox>
  );
};

export default FinallPage;

export const FinalBox = styled.div`
  width: 100%;
  margin: 30px 0 0;
`;

export const FinalText = styled.div`
  font-size:22px;
  text-align:center;
  p{
    padding: 10px 0;
  }
`;
