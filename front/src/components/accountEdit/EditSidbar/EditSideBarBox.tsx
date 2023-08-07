import React from 'react';
import styled from 'styled-components';
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import EditSidebarHeader from './EditSidebarHeader';
import EditCategoryList from '@components/accountEdit/EditCategory/EditCategoryList';
import LockIcon from '../LockIcon';




const EditSideBar = ({isAdmin} : {isAdmin : boolean;}) => {

  return (
    <SidebarBox>
      <EditSidebarHeader></EditSidebarHeader>
      {isAdmin && <EditCategoryList ></EditCategoryList>}
      {isAdmin || <LockIcon/>}
    </SidebarBox>
  );
};

export default EditSideBar;

const SidebarBox = styled(OnlyAlignCenterFlex)`
  width: 100%;
  flex-direction : column;

`;

