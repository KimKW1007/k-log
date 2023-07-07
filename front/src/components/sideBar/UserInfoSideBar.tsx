import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import profileImg from "@images/500_94.jpg"
import Image from 'next/image';
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import SearchBox from './SearchBox';
import EditCategoryList from '@components/category/EditCategoryList';
import EditButtonBox from '@components/category/EditButtonBox';
import { useQuery } from '@tanstack/react-query';
import customApi from '@utils/customApi';
import { GET_ALL_CATEGORY } from '@utils/queryKeys';
import { useRecoilState } from 'recoil';
import { currentCategoryData } from '@atoms/atoms';



const UserInfoSideBar = () => {

  return (
    <SidebarBox>
      <SidebarHeader>
        <ImgBox>
          <Image src={profileImg} alt={'프로필 이미지'} width={120} height={120}  />
        </ImgBox>
        <DescBox>
          <p>개발공부 기록 블로그입니다</p>
        </DescBox>
      </SidebarHeader>
      <SearchBox isEdit></SearchBox>
      <EditCategoryList ></EditCategoryList>
      {/* <EditButtonBox data={data && data}></EditButtonBox> */}
    </SidebarBox>
  );
};

export default UserInfoSideBar;

const SidebarBox = styled(OnlyAlignCenterFlex)`
  width: 100%;
  padding: 20px;
  flex-direction : column;

`;

const SidebarHeader = styled(OnlyAlignCenterFlex)`
  padding: 20px 0;
  flex-direction : column;
  row-gap: 30px;
  margin-bottom: 30px;
`;

const ImgBox = styled.div`
  width:120px;
  height:120px;
  border-radius: 30px;
  overflow:hidden;
  box-shadow: 4px 4px 0px 2px #DDE6ED;
  img{
    max-width:100%;
  }
`;
const DescBox = styled.div`
  p{
    font-size: 14px;
    color: #a5a5a5;
  }
`;
