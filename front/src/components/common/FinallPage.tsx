import React from 'react';
import styled from 'styled-components';

const FinallPage = ({ isSignupFinal = false }: { isSignupFinal?: boolean }) => {
  return (
    <FinalBox>
      {isSignupFinal ? (
        <FinalText>
          회원가입을 진심으로 축하합니다. <strong>K-log</strong>를 세세하게 즐겨주세요!
        </FinalText>
      ) : (
        <FinalText>
          비밀번호 변경이 완료되었습니다. 다시 한번 <strong>K-log</strong>를 즐겨주세요!
        </FinalText>
      )}
    </FinalBox>
  );
};

export default FinallPage;

const FinalBox = styled.div`
  width: 100%;
`;

const FinalText = styled.span``;
