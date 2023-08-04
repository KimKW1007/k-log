import BoardDetail from '@components/board/BoardDetail'
import type { GetServerSideProps, NextPage } from 'next';
import React from 'react'
import customApi from '@utils/customApi'
import withGetServerSideProps from '@utils/Seo/withGetServerSideProps'
import Comment from '@components/comment/Comment'
import styled, { keyframes } from 'styled-components';
import Waves from '@components/common/Waves'
import { CategoryPageProps } from '@pages/category/[title]/[subTitle]';
import useIsMount from 'src/hooks/useIsMount';
import { useQuery } from '@tanstack/react-query';
import { GET_BOARD } from '@utils/queryKeys';


const BoardPage : NextPage = ({id} : CategoryPageProps) => {
  const { getApi } = customApi(`/board/getBoard/${id}`);
  const { isMount } = useIsMount();
  const { data } = useQuery([GET_BOARD, id], () => getApi(), {
    enabled: !!isMount
  });
  console.log({data})
  return (
    <DetailWrap>
      <DetailContainer>
        <Waves />
        {data && <BoardDetail {...data}/>}
        {/* <Comment id={id}/> */}
      </DetailContainer>
    </DetailWrap>
  )
}
export const getServerSideProps : GetServerSideProps = withGetServerSideProps(async (context) => {
  const {query} = context;
  const {id} = query;
  const { getApi } = customApi(`/board/getBoard/${id}`);
  const data = await getApi();
  const {currentBoard} = data;
  return {
    props : { id, title : currentBoard.boardTitle }
  }
});

export default BoardPage

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
