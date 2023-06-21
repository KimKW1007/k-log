import React from 'react';
import styled from 'styled-components'

interface LayoutProps {
  children : React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <Root>{children}</Root>;
};

export default Layout;


const Root = styled.div`
  width: 100%;
  height:100%;
`
