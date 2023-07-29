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
import Link from 'next/link';
import UDBtnBox from './UpdateDelete/UDBtnBox';
import { useRecoilState } from 'recoil';
import { userInfomation } from '@atoms/atoms';
import { GET_BOARD } from '@utils/queryKeys';


const BoardDetail = ({ id }: { id: string }) => {
  const [currentUser, setCurrentUser] = useRecoilState(userInfomation);
  const { getApi } = customApi(`/board/${id}`);
  const { isMount } = useIsMount();
  const { reverseConvert, decodeHTMLEntities } = useConvert();
  const { data } = useQuery([GET_BOARD, id], () => getApi(), {
    enabled: !!isMount
  });
  const {currentBoard, prevBoard, nextBoard} = data ?? {};

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
      {data && 
        (<DetailWrap>
          <DetailContainer>
            <Waves />
            <DetailTitleBox>
              <CategoryBox>
                <Link href={`/category/${currentBoard.subCategory.category.categoryTitle}/${currentBoard.subCategory.categorySubTitle}`}>{`${currentBoard.subCategory.category.categoryTitle}/${currentBoard.subCategory.categorySubTitle}`}</Link>
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
                <NextPrevBoardBox type="prev" title={prevBoard.boardTitle} thumbnail={prevBoard.thumbnail } id={prevBoard.id} />
                <NextPrevBoardBox type="next" title={nextBoard.boardTitle} thumbnail={nextBoard.thumbnail } id={nextBoard.id} />
            </AnotherBoardArea>
          </DetailContainer>
          {currentUser?.id === currentBoard.subCategory.category.user.id && <UDBtnBox id={currentBoard.id} returnUrl={`/category/${currentBoard.subCategory.category.categoryTitle}/${currentBoard.subCategory.categorySubTitle}`} />}
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
  a {
    display: inline-block;
    padding: 15px 30px;
    background: ${({ theme }) => theme.color.err};
    border-radius: 30px;
    transition: .2s;
    &:hover{
      background: #FFB07F;
    }
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
  @media(max-width: 900px){
    display:block;
  }
`
