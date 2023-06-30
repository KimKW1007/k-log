import { ChildrenProps } from '@src/types/children';
import React from 'react';
import styled from 'styled-components'



const Layout = ({ children }: ChildrenProps) => {
  return <Root>{children}</Root>;
};

export default Layout;


const Root = styled.div`
  width: 100%;
  height:100%;
`
