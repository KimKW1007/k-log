import { OnlyAlignCenterFlex } from '@/src/components/common/CommonFlex';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import defaultAuthorImage from '@/src/assets/images/500_94.jpg';
import changeCreatedAt from '@/src/utils/changeCreatedAt';

const AuthorBox = ({ authorImage, author, createdAt }: { [key: string]: string }) => {
  const externaImageLoader = ({ src }: { src: string }) => `${src}`;

  return (
    <ItemAuthorBox>
      <Author>
        <AuthorImageBox>
          <AuthorImage loader={externaImageLoader} src={authorImage || defaultAuthorImage.src} alt={'프로필 이미지'} width={30} height={30} />
        </AuthorImageBox>
        <span>{author}</span>
      </Author>
      <CreatedAtBox>{changeCreatedAt(createdAt)}</CreatedAtBox>
    </ItemAuthorBox>
  );
};

export default AuthorBox;

const ItemAuthorBox = styled(OnlyAlignCenterFlex)``;

const Author = styled(OnlyAlignCenterFlex)`
  margin-right: 20px;
`;
const CreatedAtBox = styled.div``;
const AuthorImageBox = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 5px;
  overflow: hidden;
  @media (max-width: 750px) {
    width: 4vw;
    height: 4vw;
  }
`;
const AuthorImage = styled(Image)`
  width: 100%;
`;
