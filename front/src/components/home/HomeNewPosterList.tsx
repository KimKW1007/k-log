import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes, css } from 'styled-components';
import HomeNewPosterBigItem from './HomeNewPosterBigItem';
import HomeNewPosterSmItem from './HomeNewPosterSmItem';
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import customApi from '@utils/customApi';
import { useQuery } from '@tanstack/react-query';
import { EmojiDizzyFill } from '@styled-icons/bootstrap/EmojiDizzyFill';
import { EmptyIconBox } from '@components/board/BoardWrapComp';
import BoardItem from '@components/board/BoardItem';

const HomeNewPosterList = () => {
  const { getApi } = customApi('/board/getNewBoards')
  const { data } = useQuery(["GET_NEW_BOARDS"], ()=> getApi())


  
  return (
    <ListWrap>
      <ListContainer>
        {data?.length > 0 || 
          <EmptyBoardBox>
            <EmojiDizzyFill />
            <p>준비된 게시물이 없어요..</p>
          </EmptyBoardBox>
        }
        {data?.length > 0 && <>
          <HomeNewPosterBigItem {...data?.[0]} />
          <NewPosterSmList >
            {data.slice(1).map((board: { id: string; }, idx: string)=>(
              <BoardItem key={`${board.id +'salt' + idx}`} {...board} />
            ))}
          </NewPosterSmList>
        </>}
      </ListContainer>
    </ListWrap>
  )
}

export default HomeNewPosterList


const EmptyBoardBox = styled(EmptyIconBox)`
  min-height:500px;
`

const ListWrap = styled.div`
  width:100%;
  margin-bottom: 30px;
`

const ListContainer = styled.div`
  position: relative;
  width:100%;
  display:flex;
  @media (max-width: 1200px){
    display:block;
  }
`

const NewPosterSmList = styled.div`
  width:50%;
  display:flex;
  flex-direction : column;
  @media (max-width: 1280px){
    width: 41.4062vw;
  }
  @media (max-width: 1200px){
    width: 100%;
    margin-top: 30px;
  }
`

