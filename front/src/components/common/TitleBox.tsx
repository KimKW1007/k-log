import styled, {css} from "styled-components";
import React from 'react'
import { ChildrenProps } from "@components/layout/Layout";



const Title  = ({ children }:  ChildrenProps) => {
  return (
    <TitleBox isLogin={children === "로그인"}>
      <h2>{children}</h2>
    </TitleBox>
  )
}

export default Title

const TitleBox = styled.div<{isLogin ?: boolean}>`
  margin: 0 0 ${({ theme }) => theme.rem.p90};
  h2 {
    font-size: ${({ theme }) => theme.rem.p36};
  }
  ${({isLogin}) => isLogin && css`
  margin: 0 0 ${({ theme }) => theme.rem.p60};
  `}
`;