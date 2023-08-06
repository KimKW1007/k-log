import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import Image from "next/image"
import AuthorBox from '@components/board/AuthorBox';
import defaultImage from '@assets/images/defaultImage.png';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import useConvert from 'src/hooks/useConvert';

const HomeNewPosterBigItem = (board : any) => {
  const {id, author, authorImage, boardTitle, contents, createdAt, thumbnail, subCategory }  = board;
  const {categorySubTitle, category } = subCategory ?? {};
  const {categoryTitle, user} = category ?? {};
  const  {convertContent} = useConvert();

  return (
    <PosterItem>
        <PosterItemLink href={`/${id}`}>
        <PosterTop>
          <PosterCategory>
            <h3>{`${categoryTitle}-${categorySubTitle}`}</h3>
          </PosterCategory>
          <PosterTitle>
            <h4>{boardTitle}</h4>
          </PosterTitle>
        </PosterTop>
        <PostDesc dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(convertContent(contents).replace(/(<([^>]+)>)/gi, '')) }} />
        <ImageBox>
          <ImageBg thumbnailUrl={thumbnail || defaultImage.src} />
        </ImageBox>
        <AuthorBox author={author} authorImage={authorImage} />
      </PosterItemLink>
    </PosterItem>
  );
};

export default HomeNewPosterBigItem;

const PosterItemLink = styled(Link)`
  display: block;
  padding: 40px 30px 30px;

`


const ImageBox = styled.div`
  position: relative;
  height: 300px;
  background :#fff;
  margin-bottom: 30px;
  overflow:hidden;
`
const ImageBg =styled.div<{thumbnailUrl : string}>`
  width:100%;
  height:100%;
  background : url(${({thumbnailUrl}) => thumbnailUrl}) no-repeat center center/auto 100%;
  transition: .2s;
`


const PosterTop = styled.div``;

const PosterItem = styled.div`
  position: sticky;
  top: 100px;
  left: 0;
  max-height: 656px;
  display:flex;
  flex-direction :column;
  justify-content: space-between;
  width:50%;
  border: 1px solid #de4568;
  margin-right: 30px;
  transition:  .3s;
  box-shadow : 0px 0px 0px rgba(0,0,0,0);
  &:hover{
    transform : translateY(-5px);
    box-shadow : 15px 15px 15px rgba(0,0,0,.5);
  }


  @media (max-width: 1200px){
    width:100%;
    position: relative;
    top: 0;
  }

`;

const PosterCategory = styled.div`
  padding: 0 0 20px;
  h3 {
    font-size: 14px;
  }
`;
const PosterTitle = styled.div`
  margin-bottom: 30px;
  h4 {
    font-size: 40px;
  }
`;
const PostDesc = styled.div`
  flex-shrink : 0;
  margin-bottom : 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  word-break: keep-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5; 
`;
