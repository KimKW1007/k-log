import React from 'react';
import styled from 'styled-components'

export interface ChildrenProps {
  children: React.ReactNode
}

const Layout = ({ children }: ChildrenProps) => {
  return <Root>{children}</Root>;
};

export default Layout;


const Root = styled.div`
  width: 100%;
  height:100%;
`
