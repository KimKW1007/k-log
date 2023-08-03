import React from 'react'
import styled, { keyframes, css } from 'styled-components';
import SearchBox from '../sideBar/SearchBox';
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import SidebarHeader from '@components/sideBar/SidebarHeader';
import SidebarCategoryBox from '@components/sideBar/SidebarCategoryBox';

const HomeSidebar = () => {
  return (
    <SidebarBox>
      <SidebarTopBox>
        <SidebarHeader/>
        <SearchBox />
      </SidebarTopBox>
      <SidebarCategoryBox/>
    </SidebarBox>
  )
}

export default HomeSidebar
const SidebarBox = styled(OnlyAlignCenterFlex)`
  position: sticky;
  top: 100px;
  right: 0;
  flex-direction : column;
  width: 360px;
  max-height: 800px;
  border : 1px solid #DDE6ED;
  border-radius: 30px;
  overflow:hidden;
  padding: ${({theme}) => theme.rem.p20} 0;
  background: #343434;
  row-gap: 40px;
  flex-shrink: 0;
`;
const SidebarTopBox = styled.div`
  padding: 0 50px;
`
