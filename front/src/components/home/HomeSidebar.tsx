import React from 'react';
import styled from 'styled-components';
import SearchBox from '../../search/SearchBox';
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import SidebarHeader from '@components/sideBar/SidebarHeader';
import SidebarCategoryBox from '@components/sideBar/SidebarCategoryBox';

const HomeSidebar = () => {
  return (
    <SidebarBox>
      <SidebarHeader />
      <SearchBox />
      <SidebarCategoryBox />
    </SidebarBox>
  );
};

export default HomeSidebar;
const SidebarBox = styled(OnlyAlignCenterFlex)`
  position: sticky;
  top: 100px;
  right: 0;
  flex-direction: column;
  width: 360px;
  max-height: 800px;
  border: 1px solid #dde6ed;
  border-radius: 30px;
  overflow: hidden;
  padding: 20px 0;
  background: #343434;
  row-gap: 40px;
  flex-shrink: 0;
`;
