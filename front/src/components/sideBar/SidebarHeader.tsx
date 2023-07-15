import { DescBox, ImgBox, SidebarHeaderBox } from '@components/accountEdit/EditSidbar/EditSidebarHeader';
import { useQuery } from '@tanstack/react-query';
import customApi from '@utils/customApi';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import defaultImage from '@assets/images/500_94.jpg';

const SidebarHeader = () => {
  const { getApi } = customApi('/file/getUserPl');
  const { data } = useQuery(['GET_USER_MINI_PL'], getApi);

  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const descriptionMapping = ()=>{
    if(description){
      return description.split("\r\n").map(ele=>(
        <p>{ele}</p>
      ))
    }
  }

  useEffect(() => {
    if (data) {
      setImageUrl(data?.imageUrl);
      setDescription(data?.description);
    }
  }, [data]);

  return (
    <HomeSidebarHeaderBox>
      <ImgBox isBgBlack>
        <Image src={imageUrl || defaultImage.src} alt={'프로필 이미지'} width={120} height={120} />
      </ImgBox>
      <UserDescBox>{descriptionMapping()}</UserDescBox>
    </HomeSidebarHeaderBox>
  );
};

export default SidebarHeader;

const HomeSidebarHeaderBox = styled(SidebarHeaderBox)`
  width:100%;
`

const UserDescBox = styled(DescBox)`
  width:100%;
  text-align:center;
  p{
    font-size: 14px;
    line-height: 18px;
    color: #a9a9a9;
  }
`

