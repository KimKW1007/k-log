import React from 'react'
import styled, { keyframes, css } from 'styled-components';
import SearchBox from '../sideBar/SearchBox';
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import SidebarHeader from '@components/sideBar/SidebarHeader';
import SidebarCategoryBox from '@components/sideBar/SidebarCategoryBox';

const HomeSidebar = () => {
  return (
    <SidebarBox>
      <SidebarHeader/>
      <SearchBox />
      <SidebarCategoryBox/>
    </SidebarBox>
  )
}

export default HomeSidebar
const SidebarBox = styled(OnlyAlignCenterFlex)`
  flex-direction : column;
  width: 360px;
  border : 1px solid #DDE6ED;
  border-radius: 30px;
  overflow:hidden;
  padding: ${({theme}) => theme.rem.p20} ${({theme}) => theme.rem.p50};
  background: #232323;
  row-gap: 40px;
`;
