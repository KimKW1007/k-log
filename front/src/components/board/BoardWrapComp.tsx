import React, { useEffect, useState } from 'react';
import useIsMount from 'src/hooks/useIsMount';
import styled, { keyframes, css } from 'styled-components';
import BoardItem from './BoardItem';
import Link from 'next/link';
import night_BG from '@assets/images/dark_night.jpg';
import { EmojiDizzyFill } from '@styled-icons/bootstrap/EmojiDizzyFill';
import { AllCenterFlex, OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import Loading from '@components/common/Loading/Loading';
import LoadingText from '@components/common/Loading/LoadingText';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { userInfomation } from '@atoms/atoms';
import { IosArrowLtr, IosArrowRtl } from '@styled-icons/fluentui-system-filled'
import PageNationArea from './PageNationArea';



interface BoardWrapProps {
  title:  string[];
  currentList: any;
  isLoading: boolean;
  lastPage: number;
}

const BoardWrapComp = ({ title, currentList, isLoading, lastPage }: BoardWrapProps) => {
  const { isMount } = useIsMount();
  const [currentUser, setCurrentUser] = useRecoilState(userInfomation);
  const router = useRouter();
  const onClickRouterPushCreatePage = () => {
    router.push(`/category/${title[0].replaceAll("/","-")}/${title[1].replaceAll("/","-")}/create`);
  };


 



  return (
    <CategoryWrap>
      <CategoryContainer>
        <BoardTitleBox>
          <BoardTitleInnerBox>{isMount && title.map((ele, idx) => <p key={ele + 'salt' + idx}>{ele}</p>) }</BoardTitleInnerBox>
        </BoardTitleBox>
        <ListBox isLoading={isLoading} isEmpty={Boolean(currentList?.length < 1)}>
          {isMount && currentUser?.isAdmin && title.length > 1 && <CreateBoardBtn onClick={onClickRouterPushCreatePage}>글쓰기</CreateBoardBtn>}
          {isLoading && <LoadingText />}
          {isLoading ||
            (currentList?.length >= 1 ? (
              <>
              <ListInnerBox>
                {currentList?.map((board: any) => (
                  <BoardItem {...board} key={board.id}></BoardItem>
                ))}
              </ListInnerBox>
              <PageNationArea lastPage={lastPage} />
              </>
            ) : (
              <EmptyIconBox>
                <EmojiDizzyFill />
                <span>아직 만들어진 게시물이 없네요..</span>
              </EmptyIconBox>
            ))}
        </ListBox>
      </CategoryContainer>
    </CategoryWrap>
  );
};

export default BoardWrapComp;

const CategoryWrap = styled.div`
  position: relative;
  z-indexL:  2
  width: 100%;
  padding: 0 50px;
  background: linear-gradient(to right, rgba(11, 11, 22, 0.8) 100%, rgba(11, 11, 22, 0.8) 100%), url(${night_BG.src}) no-repeat center center/cover fixed;
  @media (max-width: 1300px) {
    padding: 0 3.8461vw;
  }
  @media (max-width: 600px) {
    padding: 0 0;
  }
`;

const CategoryContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const BoardTitleBox = styled.div`
  text-align: center;
  font-size: 30px;
  padding: 100px 0;
  border-radius: 0 0 100px 100px;
  background: #23262d;
  margin-bottom: 20px;
  transition: font-size 0.3s;
  p:last-child {
    display: inline-block;
    font-size: 36px;
    padding: 30px 30px 15px;
    border-bottom: 2px solid ${({ theme }) => theme.color.err};
  }
  @media (max-width: 1300px) {
    min-height: auto;
    padding: 7.6923vw 0;
    border-radius: 0 0 7.6923vw 7.6923vw;
  }
  @media (max-width: 900px) {
    font-size: 24px;
    p:last-child {
      font-size: 30px;
      padding: 15px 30px 10px;
    }
  }
  @media (max-width: 700px) {
    p:last-child {
      padding: 15px 30px 10px;
    }
  }
  @media (max-width: 550px) {
    font-size: 18px;
  }
`;
const BoardTitleInnerBox = styled.div`
  min-height: 120px;
  @media (max-width: 1300px) {
    min-height: 80px;
  }
  @media (max-width: 900px) {
    min-height: 80px;
  }
  @media (max-width: 700px) {
    min-height: 68px;
  }
`;

const ListBox = styled(OnlyAlignCenterFlex)<{ isLoading: boolean; isEmpty: boolean }>`
  position: relative;
  background: #23262d60;
  border-radius: 100px 100px 0 0;
  min-height: 800px;
  padding: 120px 50px 50px;
  flex-direction: column;
  justify-content: space-between;
  ${({ isLoading, isEmpty }) =>
    (isLoading || isEmpty) &&
    `
    display:flex;
    align-items: center;
  `}
  @media(max-width:1300px) {
    padding: 120px 3.8461vw 50px;
    border-radius: 7.6923vw 7.6923vw 0 0;
  }
  @media (max-width: 750px) {
    padding: 120px 60px 50px;
  }
  @media (max-width: 600px) {
    padding: 120px 40px 50px;
  }
`;

const ListInnerBox = styled.div`
width:100%;
`


export const EmptyIconBox = styled(AllCenterFlex)`
  width: 100%;
  flex-direction: column;
  min-height: 630px;
  svg {
    width: 70px;
    margin-bottom: 30px;
  }
`;


const CreateBoardBtn = styled.button`
  position: absolute;
  right: 8%;
  top: 40px;
  line-height: 15px;
  padding: 12px 30px;
  background: #e1e1e1;
  border-radius: 20px;
  transition: 0.2s;
  &:hover {
    background: #fff;
  }
`;
