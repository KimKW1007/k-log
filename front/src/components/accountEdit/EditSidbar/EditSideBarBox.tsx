import React from 'react';
import styled from 'styled-components';
import profileImg from "@images/500_94.jpg"
import Image from 'next/image';
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import SearchBox from '../../sideBar/SearchBox';
import EditSidebarHeader from './EditSidebarHeader';
import EditCategoryList from '@components/accountEdit/EditCategory/EditCategoryList';




const EditSideBar = () => {

  return (
    <SidebarBox>
      <EditSidebarHeader></EditSidebarHeader>
      <EditCategoryList ></EditCategoryList>
    </SidebarBox>
  );
};

export default EditSideBar;

const SidebarBox = styled(OnlyAlignCenterFlex)`
  width: 100%;
  flex-direction : column;

`;

