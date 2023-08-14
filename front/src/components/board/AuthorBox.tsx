import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import defaultAuthorImage from '@assets/images/500_94.jpg';
import changeCreatedAt from '@utils/changeCreatedAt';

const AuthorBox = ({ authorImage, author, createdAt }: { [key: string]: string }) => {
  return (
    <ItemAuthorBox>
      <Author>
        <AuthorImageBox>
          <AuthorImage src={authorImage || defaultAuthorImage.src} alt={'프로필 이미지'} width={30} height={30} />
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
