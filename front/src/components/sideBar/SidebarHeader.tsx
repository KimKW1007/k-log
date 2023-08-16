import { DescBox, ImgBox, SidebarHeaderBox } from '@/src/components/accountEdit/EditSidbar/EditSidebarHeader';
import { useQuery } from '@tanstack/react-query';
import customApi from '@/src/utils/customApi';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import defaultImage from '@/src/assets/images/500_94.jpg';
import { ADMIN, GET_USER_MINI_PL } from '@/src/utils/queryKeys';

const SidebarHeader = () => {
  const { getApi } = customApi('/file/getAdminPl');
  const { data } = useQuery([GET_USER_MINI_PL, ADMIN], () => getApi());

  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const descriptionMapping = () => {
    if (description) {
      return description.split('\r\n').map((ele, idx) => <React.Fragment key={`${idx + 'description' + ele}`}>{ele === '' ? <br /> : <p>{ele}</p>}</React.Fragment>);
    }
  };

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
  width: 260px;
`;

const UserDescBox = styled(DescBox)`
  width: 100%;
  text-align: center;
  p {
    font-size: 14px;
    line-height: 18px;
    color: #a9a9a9;
  }
`;
