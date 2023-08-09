import Waves from '@components/common/Waves';
import { useQuery } from '@tanstack/react-query';
import changeCreatedAt from '@utils/changeCreatedAt';
import customApi from '@utils/customApi';
import DOMPurify from 'dompurify';
import React, { useEffect, useRef, useState } from 'react';
import useConvert from 'src/hooks/useConvert';
import useIsMount from 'src/hooks/useIsMount';
import styled, { keyframes } from 'styled-components';
import { ContentsWrap } from '@styles/boardContents-style';
import createBlockquoteBox from '@utils/createBlockquoteBox';
import { AllCenterFlex, OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import NextPrevBoardBox from './NextPrevBoardBox';
import Link from 'next/link';
import UDBtnBox from './UpdateDelete/UDBtnBox';
import { useRecoilState } from 'recoil';
import { userInfomation } from '@atoms/atoms';
import { GET_BOARD } from '@utils/queryKeys';
import PageLoading from '@components/common/Loading/PageLoading';
import { User5 } from '@styled-icons/remix-fill/User5'
import { AccessTime } from '@styled-icons/material-rounded/AccessTime'
import codeBlockStyler from '@utils/codeBlockStyler';





const BoardDetail = ({ id }: { id: string }) => {
  const [currentUser, setCurrentUser] = useRecoilState(userInfomation);
  const { getApi } = customApi(`/board/getBoard/${id}`);
  const { isMount } = useIsMount();
  const { convertContent } = useConvert();
  const { data, isLoading, refetch } = useQuery([GET_BOARD, id], () => getApi(), {
    enabled: !!isMount
  });
  const { currentBoard, prevBoard, nextBoard } = data ?? {};
  const { author, authorImage, boardTitle, contents, createdAt, thumbnail, tags, subCategory } = currentBoard ?? {};
  const { categorySubTitle, category } = subCategory ?? {};
  const { categoryTitle, user } = category ?? {};

  const contentsWrapRef = useRef<HTMLDivElement>(null);

  const { wrapConsecutiveBlockquotes } = createBlockquoteBox(contentsWrapRef);
  useEffect(() => {
    if(contentsWrapRef.current){
      contentsWrapRef.current.innerHTML = DOMPurify.sanitize(convertContent(contents))
      if(contentsWrapRef.current.innerHTML){
        wrapConsecutiveBlockquotes();
        codeBlockStyler(contentsWrapRef);
      }
    }
  }, [data, contentsWrapRef]);

  useEffect(()=>{
    refetch()
  },[isMount])

  return (
    <>
      <PageLoading isLoading={isLoading} />
      {data && (
        <>
          <DetailTitleBox>
            <CategoryBox>
              <Link href={`/category/${categoryTitle.replaceAll('/', '-')}/${categorySubTitle.replaceAll('/', '-')}`}>{`${categoryTitle} - ${categorySubTitle}`}</Link>
            </CategoryBox>
            <h2>{boardTitle}</h2>
            <CreatedDateBox>
              <div><User5 /><span>{author}</span></div>
              &#183;
              <div><AccessTime /><span>{changeCreatedAt(createdAt)}</span></div>
            </CreatedDateBox>
          </DetailTitleBox>
          <ContentsWrap ref={contentsWrapRef}  />
          <TagBox>{tags.length > 0 && tags.split(',').map((tag: string, idx: number) => <TagBtn key={tag + idx}>{tag}</TagBtn>)}</TagBox>
          <AnotherBoardArea>
            <NextPrevBoardBox type="prev" title={prevBoard.boardTitle} thumbnail={prevBoard.thumbnail} id={prevBoard.id} />
            <NextPrevBoardBox type="next" title={nextBoard.boardTitle} thumbnail={nextBoard.thumbnail} id={nextBoard.id} />
          </AnotherBoardArea>
          {currentUser?.id === user.id && <UDBtnBox id={id} returnUrl={`/category/${categoryTitle.replaceAll('/', '-')}/${categorySubTitle.replaceAll('/', '-')}`} />}
        </>
      )}
    </>
  );
};

export default BoardDetail;

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
    transition: 0.2s;
    &:hover {
      background: #ffb07f;
    }
  }
`;

const CreatedDateBox = styled(AllCenterFlex)`
  font-size: 16px;

  > div{
    display:flex;
    aling-items:center;
    margin : 0 10px;
    svg{
      width: 1.1em;
      margin: -1px 4px 0 0;
    }
    span{
      display:inline-block;
      line-height: 1.5em;
      flex-shrink : 0;
    }
  }

`;

const TagBox = styled(OnlyAlignCenterFlex)`
  flex-wrap:wrap;
  padding: 30px 0;
  border-bottom: 1px solid rgba(128,128,128,0.3);

`;
const TagBtn = styled.div`
  padding: 7px 15px 5px;
  border-radius: 6px;
  line-height: 20px;
  color: #fff;
  background: #454545;
  transition: 0.3s;
  cursor:default;
  & + & {
    margin-left: 10px;
  }
  &:hover {
    background: ${({ theme }) => theme.color.success};
  }
`;

const AnotherBoardArea = styled(OnlyAlignCenterFlex)`
  width: 100%;
  justify-content: space-between;
  @media (max-width: 900px) {
    display: block;
  }
`;
