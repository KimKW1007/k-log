import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import React from 'react'
import styled, { keyframes } from 'styled-components';
import Image from "next/image";
import defaultImage from '@assets/images/500_94.jpg';
import useConvert from 'src/hooks/useConvert';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';



const BoardItem = (board : any) => {
  const {author, authorImage, boardTitle, contents, createdAt, thumbnail, subCategory : {categorySubTitle}  }  = board;
  const  {reverseConvert} = useConvert();
  return (
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
        <ItemDescBox>
          {reverseConvert(contents).replace(/(<([^>]+)>)/gi, '')}
        </ItemDescBox>
        <ItemDetailBox>
          <ItemAuthorBox>
            <AuthorImageBox>
              <AuthorImage src={authorImage || defaultImage.src} alt={'프로필 이미지'} width={0} height={0} sizes='100vw' />
            </AuthorImageBox>
            <span>{author}</span>
          </ItemAuthorBox>
          <CreatedDateBox>
            {format(new Date(createdAt), 'yyyy-MM-dd HH:mm', { locale: ko })}
          </CreatedDateBox>
        </ItemDetailBox>
      </ContentsBox>
      <ImageBox>
        <ImageBg src={thumbnail || defaultImage.src} />
      </ImageBox>
    </ItemWrap>
  )
}

export default BoardItem

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

const CreatedDateBox = styled.div`


`

const AuthorImage = styled(Image)`
  width:100%;
  height:auto;
`




const ImageBox = styled.div`
  position: relative;
  width: 168px;
  height: 168px;
  overflow : hidden;
  img{
    width:100%;
    height:100%;
  }
  @media(max-width:750px){
    width: 100%;
    height: 46.6666vw;
    order: 1;
    width: 100%;
  }
`

const ImageBg =styled.div<{src : string;}>`
  width:100%;
  height:100%;
  background: url(${({src}) => src}) no-repeat center center/cover;
`