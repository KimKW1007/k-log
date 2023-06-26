import styled from "styled-components";
import React from 'react'
import { ChildrenProps } from "@components/layout/Layout";



const Title  = ({ children }:  ChildrenProps) => {
  return (
    <TitleBox>
      <h2>{children}</h2>
    </TitleBox>
  )
}

export default Title

const TitleBox = styled.div`
  margin: 0 0 ${({ theme }) => theme.rem.p90};
  h2 {
    font-size: ${({ theme }) => theme.rem.p36};
  }
`;