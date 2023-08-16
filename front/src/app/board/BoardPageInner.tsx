'use client';
import BoardDetail from '@/src/components/board/BoardDetail';
import Comment from '@/src/components/comment/Comment';
import Waves from '@/src/components/common/Waves';
import React from 'react'
import styled from 'styled-components';

const BoardPageInner = ({id} : {id : string}) => {
  return (
    <DetailWrap>
      <DetailContainer>
        <Waves />
        <BoardDetail id={id} />
        <Comment id={id} />
      </DetailContainer>
    </DetailWrap>
  )
}

export default BoardPageInner

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
