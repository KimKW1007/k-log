import React from 'react';
import styled from 'styled-components';
import HomeNewPosterBigItem from './HomeNewPosterBigItem';
import customApi from '@/src/utils/customApi';
import { useQuery } from '@tanstack/react-query';
import { EmojiDizzyFill } from '@styled-icons/bootstrap/EmojiDizzyFill';
import { EmptyIconBox } from '@/src/components/board/BoardWrapComp';
import BoardItem from '@/src/components/board/BoardItem';
import { GET_NEW_BOARDS } from '@/src/utils/queryKeys';

const HomeNewPosterList = () => {
  const { getApi } = customApi('/board/getNewBoards');
  const { data } = useQuery([GET_NEW_BOARDS], () => getApi());

  return (
    <ListWrap>
      <ListContainer>
        {data?.length > 0 || (
          <EmptyBoardBox>
            <EmojiDizzyFill />
            <p>준비된 게시물이 없어요..</p>
          </EmptyBoardBox>
        )}
        {data?.length > 0 && (
          <>
            <HomeNewPosterBigItem {...data?.[0]} />
            <NewPosterSmList>
              {data?.length > 1 ? (
                <>
                  {data.slice(1).map((board: { id: string }, idx: string) => (
                    <BoardItem key={`${board.id + 'salt' + idx}`} {...board} />
                  ))}
                </>
              ) : (
                <EmptyBoardBox>
                  <EmojiDizzyFill />
                  <p>더 만들고 있어요 잠시만요!</p>
                </EmptyBoardBox>
              )}
            </NewPosterSmList>
          </>
        )}
      </ListContainer>
    </ListWrap>
  );
};

export default HomeNewPosterList;

const EmptyBoardBox = styled(EmptyIconBox)`
  min-height: 500px;
  margin: auto;
`;

const ListWrap = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const ListContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  @media (max-width: 1200px) {
    display: block;
  }
`;

const NewPosterSmList = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  @media (max-width: 1200px) {
    width: 100%;
    margin-top: 30px;
  }
`;
