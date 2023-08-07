import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import React from 'react'
import styled, { keyframes } from 'styled-components';
import Image from "next/image";
import defaultImage from '@assets/images/defaultImage.png';
import useConvert from 'src/hooks/useConvert';
import changeCreatedAt from '@utils/changeCreatedAt';
import AuthorBox from './AuthorBox';
import Link from 'next/link';
import DOMPurify from 'dompurify';



const BoardItem = (board : any) => {
  const {id, author, authorImage, boardTitle, contents, createdAt, thumbnail, subCategory : {categorySubTitle}  }  = board;
  const  {convertContent} = useConvert();
  return (
    <ItemLink href={`/${id}`}>
      <ItemWrap>
        <ContentsBox>
          <ItemCategory>
            <span>
              {categorySubTitle}
            </span>
          </ItemCategory>
          <ItemTitleBox>
            <p>{boardTitle}</p>
          </ItemTitleBox>
          <ItemDescBox dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(convertContent(contents).replace(/(<([^>]+)>)/gi, '')) }} />
          <ItemDetailBox>
            <AuthorBox author={author} authorImage={authorImage} createdAt={createdAt} />
          </ItemDetailBox>
        </ContentsBox>
        <ImageBox isDefaultImg={!Boolean(thumbnail)}>
          <ImageBg thumbnailUrl={thumbnail || defaultImage.src} />
        </ImageBox>
      </ItemWrap>
    </ItemLink>
  )
}

export default BoardItem

const ItemLink = styled(Link)`
  display: block;
  width:100%;
  border-radius: 10px;
  overflow: hidden;
  background: #39486755;
  transform: translateY(0);
  box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  transition: 0.3s;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(255, 255, 255, 0.6);
    background: #394867d5;
  }
  & + & {
    margin-top: 30px;
  }
`;

const ItemWrap = styled(OnlyAlignCenterFlex)`
  padding: 30px 30px 20px;
  column-gap: 30px;
  @media(max-width:750px){
    padding: 0;
    flex-direction : column;
  }

`
const ContentsBox =styled.div`
  flex: 1;
  @media(max-width:750px){
    width:100%;
    padding: 20px;
    order: 2;
  }
`
const ItemCategory =styled.div`
margin-bottom: 24px;
span{
  font-size : 12px;
  background: #75C2F6;
  display:inline-block;
  padding: 10px 15px;
  border-radius: 20px;
}
@media(max-width:750px){
  margin-bottom : 16px;
}
`
const ItemTitleBox =styled.div`
font-size : 20px;
margin-bottom : 24px;
p{
  white-space : nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media(max-width:750px){
  margin-bottom : 16px;
}
`
const ItemDescBox =styled.div`
  min-height: 60px;
  line-height: 20px;
  font-size : 14px;
  margin-bottom: 24px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  word-break: keep-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; 
`
const ItemDetailBox =styled(OnlyAlignCenterFlex)`
  font-size: 14px;
  @media(max-width:750px){
    font-size: 1.8666vw;
  }
  @media(max-width:600px){
    font-size: 12px;
  }
`
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

export const CreatedDateBox = styled.div`


`

const AuthorImage = styled(Image)`
  width:100%;
  height:auto;
`




const ImageBox = styled.div<{isDefaultImg : boolean;}>`
  position: relative;
  width: 168px;
  height: 168px;
  background: #fff;
  overflow : hidden;
  img{
    width:100%;
    height:100%;
  }
  ${({isDefaultImg}) => isDefaultImg && `
    padding:30px;
  `}
  @media(max-width:750px){
    width: 100%;
    height: 46.6666vw;
    order: 1;
    width: 100%;
  }
`

const ImageBg =styled.div<{thumbnailUrl : string;}>`
  width:100%;
  height:100%;
  background: url(${({thumbnailUrl}) => thumbnailUrl}) no-repeat center center/100% 100%;
`