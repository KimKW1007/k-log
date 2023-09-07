import { OnlyAlignCenterFlex } from '@/src/components/common/CommonFlex';
import React from 'react';
import styled from 'styled-components';
import defaultImage from '@/src/assets/images/defaultImage.png';
import AuthorBox from './AuthorBox';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import useConvert from '@/src/hooks/useConvert';

const BoardItem = (board: any) => {
  const {
    id,
    author,
    authorImage,
    boardTitle,
    contents,
    createdAt,
    thumbnail,
    subCategory: { categorySubTitle }
  } = board;
  const { decodeHTMLEntities } = useConvert();
  return (
    <ItemLink href={`/${id}`}>
      <ItemWrap>
        <ContentsBox>
          <ItemCategory>
            <span>{categorySubTitle}</span>
          </ItemCategory>
          <ItemTitleBox>
            <p>{boardTitle}</p>
          </ItemTitleBox>
          <ItemDescBox
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                decodeHTMLEntities(contents)
                  .replace(/(<([^>]+)>)/gi, '')
                  .replaceAll("&nbsp;"," ")
                  .slice(0, 500)
              )
            }}
          />
          <ItemDetailBox>
            <AuthorBox author={author} authorImage={authorImage} createdAt={createdAt} />
          </ItemDetailBox>
        </ContentsBox>
        <ImageBox isDefaultImg={!Boolean(thumbnail)}>
          <ImageBg thumbnailUrl={thumbnail || defaultImage.src} />
        </ImageBox>
      </ItemWrap>
    </ItemLink>
  );
};

export default BoardItem;

const ItemLink = styled(Link)`
  display: block;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  background: #39486755;
  padding: 30px 30px 20px;
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
  width: 100%;
  justify-content: space-between;
  @media (max-width: 750px) {
    padding: 0;
    flex-direction: column;
  }
`;
const ContentsBox = styled.div`
  width: calc(100% - 200px);
  @media (max-width: 750px) {
    width: 100%;
    padding: 20px 10px;
    order: 2;
  }
`;
const ItemCategory = styled.div`
  margin-bottom: 24px;
  span {
    font-size: 12px;
    background: #75c2f6;
    display: inline-block;
    padding: 10px 15px;
    border-radius: 20px;
  }
  @media (max-width: 750px) {
    margin-bottom: 16px;
  }
`;
const ItemTitleBox = styled.div`
  font-size: 20px;
  margin-bottom: 24px;
  p {
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: 750px) {
    margin-bottom: 16px;
  }
`;
const ItemDescBox = styled.div`
  width: 100%;
  min-height: 60px;
  line-height: 20px;
  font-size: 14px;
  margin-bottom: 24px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  word-break: keep-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;
const ItemDetailBox = styled(OnlyAlignCenterFlex)`
  font-size: 14px;
`;

export const CreatedDateBox = styled.div``;

const ImageBox = styled.div<{ isDefaultImg: boolean }>`
  position: relative;
  width: 168px;
  height: 168px;
  background: #fff;
  overflow: hidden;
  flex-shrink: 0;
  margin-left: 30px;
  img {
    width: 100%;
    height: 100%;
  }
  ${({ isDefaultImg }) =>
    isDefaultImg &&
    `
    padding:30px;
  `}
  @media(max-width:750px) {
    width: 100%;
    height: 46.6666vw;
    order: 1;
    padding: 0;
    margin-left: 0;
    width: 100%;
  }
`;

const ImageBg = styled.div<{ thumbnailUrl: string }>`
  width: 100%;
  height: 100%;
  background: url(${({ thumbnailUrl }) => thumbnailUrl}) no-repeat center center/auto 100%;
`;
