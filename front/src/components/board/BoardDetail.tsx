import Waves from '@components/common/Waves';
import { useQuery } from '@tanstack/react-query';
import changeCreatedAt from '@utils/changeCreatedAt';
import customApi from '@utils/customApi';
import DOMPurify from 'dompurify';
import React, { useEffect, useRef, useState } from 'react';
import useConvert from 'src/hooks/useConvert';
import useIsMount from 'src/hooks/useIsMount';
import styled, { keyframes } from 'styled-components';
import 'highlight.js/styles/atom-one-dark-reasonable.css';
import { ContentsWrap } from '@styles/boardContents-style';
import createBlockquoteBox from '@utils/createBlockquoteBox';
import codeBlockJsStyle from '@utils/codeBlockJsStyle';
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import NextPrevBoardBox from './NextPrevBoardBox';


const BoardDetail = ({ id }: { id: string }) => {
  const { getApi } = customApi(`/board/${id}`);
  const { isMount } = useIsMount();
  const { reverseConvert, decodeHTMLEntities } = useConvert();
  const { data } = useQuery(['GET_BOARD', id], getApi, {
    enabled: !!isMount
  });
  const {currentBoard, prevBoard, nextBoard} = data ?? {};
  console.log(data)

  const contentsWrapRef = useRef<HTMLDivElement>(null);

  const {wrapConsecutiveBlockquotes} = createBlockquoteBox(contentsWrapRef);
  useEffect(() => {
    wrapConsecutiveBlockquotes();
  }, [data]);

  useEffect(() => {
    codeBlockJsStyle(contentsWrapRef)
  }, [data]);
  return (
    <>
      {currentBoard && 
        (<DetailWrap>
          <DetailContainer>
            <Waves />
            <DetailTitleBox>
              <CategoryBox>
                <span>{`${currentBoard.subCategory.category.categoryTitle}/${currentBoard.subCategory.categorySubTitle}`}</span>
              </CategoryBox>
              <h2>{currentBoard.boardTitle}</h2>
              <CreatedDateBox>{changeCreatedAt(currentBoard.createdAt)}</CreatedDateBox>
            </DetailTitleBox>
            <ContentsWrap ref={contentsWrapRef} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(reverseConvert(currentBoard.contents)) }} />
            <DetailTagBox>
              {data && currentBoard.tags && currentBoard.tags.split(",").map((tag : string, idx:number) =>(
                <TagBtn key={tag + idx}>{tag}</TagBtn>
              ))}
            </DetailTagBox>
            <AnotherBoardArea>
              {prevBoard && <NextPrevBoardBox type="prev" title={prevBoard.boardTitle} thumbnail={prevBoard.thumbnail } id={prevBoard.id} />}
              {nextBoard && <NextPrevBoardBox type="next" title={nextBoard.boardTitle} thumbnail={nextBoard.thumbnail } id={nextBoard.id} />}
            </AnotherBoardArea>
          </DetailContainer>
        </DetailWrap>)
      }
    </>
  );
};

export default BoardDetail;

const DetailWrap = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const DetailContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 50px;
  @media (max-width: 660px) {
    padding: 100px 20px;
  }
`;

const DetailTitleBox = styled.div`
  position: relative;
  text-align: center;
  margin-bottom: 100px;
  h2 {
    font-size: 50px;
    margin-bottom: 20px;
  }
`;

const CategoryBox = styled.div`
  margin-bottom: 30px;
  span {
    display: inline-block;
    padding: 15px 30px;
    background: ${({ theme }) => theme.color.err};
    border-radius: 30px;
  }
`;

const CreatedDateBox = styled.div`
  font-size: 14px;
`;

const DetailTagBox = styled.div`

`
const  TagBtn = styled.button`
  padding: 7px 15px 5px;
  border-radius: 6px;
  line-height: 20px;
  color: #fff;
  background : #454545;
  transition: .3s;
  & + &{
    margin-left: 10px;
  }
  &:hover{
    background :${({theme}) => theme.color.success};
  }
`


const AnotherBoardArea =styled(OnlyAlignCenterFlex)`
  width:100%;
  justify-content: space-between;
`
