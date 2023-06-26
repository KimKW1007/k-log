import styled from "styled-components";

export const InputsBox = styled.div`
  width: 100%;
  div:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.rem.p20};
  }
`;