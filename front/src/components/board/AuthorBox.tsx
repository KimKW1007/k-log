import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import React from 'react'
import styled, { keyframes } from 'styled-components';
import Image from "next/image";
import defaultAuthorImage from '@assets/images/500_94.jpg';

const AuthorBox = ({authorImage, author} : {[key : string] : string}) => {
  return (
    <ItemAuthorBox>
      <AuthorImageBox>
        <AuthorImage src={authorImage || defaultAuthorImage.src} alt={'프로필 이미지'} width={0} height={0} sizes='100vw' />
      </AuthorImageBox>
      <span>{author}</span>
    </ItemAuthorBox>
  )
}

export default AuthorBox

const ItemAuthorBox =styled(OnlyAlignCenterFlex)`
  margin-right: 20px;
 
`
const AuthorImageBox= styled.div`
  position:relative;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 5px;
  overflow: hidden;
  @media(max-width:750px){
    width: 4vw;
    height: 4vw;
  }
`
const AuthorImage = styled(Image)`
  width:100%;
  height:auto;
`
