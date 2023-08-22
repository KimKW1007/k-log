import React from 'react';
import styled from 'styled-components';
import AuthorBox from '@/src/components/board/AuthorBox';
import defaultImage from '@/src/assets/images/defaultImage.png';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import { OnlyAlignCenterFlex } from '@/src/components/common/CommonFlex';
import useConvert from '@/src/hooks/useConvert';

const HomeNewPosterBigItem = (board: any) => {
  const { id, author, authorImage, boardTitle, contents, createdAt, thumbnail, subCategory } = board;
  const { categorySubTitle, category } = subCategory ?? {};
  const { categoryTitle, user } = category ?? {};
  const { convertContent } = useConvert();

  return (
    <PosterItem>
      <PosterItemLink href={`/${id}`}>
        <PosterTop>
          <PosterCategory>
            <h3>{`${categoryTitle} - ${categorySubTitle}`}</h3>
          </PosterCategory>
          <PosterTitle>
            <h4>{boardTitle}</h4>
          </PosterTitle>
        </PosterTop>
        <PostDesc dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(convertContent(contents).replace(/(<([^>]+)>)/gi, '')) }} />
        <ImageBox>
          <ImageBg isDefault={!Boolean(thumbnail)} thumbnailUrl={thumbnail || defaultImage.src} />
        </ImageBox>
        <AuthorAndDateBox>
          <AuthorBox author={author} authorImage={authorImage} createdAt={createdAt} />
        </AuthorAndDateBox>
      </PosterItemLink>
    </PosterItem>
  );
};

export default HomeNewPosterBigItem;

const PosterItemLink = styled(Link)`
  padding: 40px 30px 30px;
`;
const AuthorAndDateBox = styled(OnlyAlignCenterFlex)`
  margin-top: 20px;
`;

const ImageBox = styled.div`
  position: relative;
  height: 250px;
  background: #fff;
  margin-bottom: 30px;
  overflow: hidden;
  margin: auto 0 0;
`;
const ImageBg = styled.div<{ thumbnailUrl: string; isDefault: boolean }>`
  width: 100%;
  height: 100%;
  background: url(${({ thumbnailUrl }) => thumbnailUrl}) no-repeat center center/cover;
  transition: 0.2s;
  ${({ isDefault }) =>
    isDefault &&
    `
  background-size: auto 100%;
`}
`;

const PosterTop = styled.div``;

const PosterItem = styled.div`
  position: sticky;
  top: 100px;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  border: 2px solid #de4568;
  margin-right: 30px;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  &:hover {
    transform: translateY(-5px);
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 1200px) {
    width: 100%;
    position: relative;
    top: 0;
  }
`;

const PosterCategory = styled.div`
  padding: 0 0 20px;
  h3 {
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    word-break: keep-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;
const PosterTitle = styled.div`
  margin-bottom: 30px;
  h4 {
    font-size: 40px;
  }
  @media(max-width: 600px){
    h4 {
      font-size: 6vw;
    }
  }
`;
const PostDesc = styled.div`
  flex-shrink: 0;
  margin-bottom: 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  word-break: keep-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
`;
