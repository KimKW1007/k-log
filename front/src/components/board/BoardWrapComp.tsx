import React from 'react';
import useIsMount from 'src/hooks/useIsMount';
import styled, { keyframes } from 'styled-components';
import BoardItem from './BoardItem';
import Link from 'next/link';
import night_BG from '@assets/images/dark_night.jpg';
import { EmojiDizzyFill } from '@styled-icons/bootstrap/EmojiDizzyFill';
import { AllCenterFlex, OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import Loading from '@components/common/Loading/Loading';
import LoadingText from '@components/common/Loading/LoadingText';

interface BoardWrapProps {
  title: string;
  currentList: any;
  isLoading: boolean;
}

const BoardWrapComp = ({ title, currentList, isLoading }: BoardWrapProps) => {
  const { isMount } = useIsMount();

  return (
    <CategoryWrap>
      <CategoryContainer>
        <TitleBox>
          {isMount &&  (title.includes('/') ? title.split('/').map((ele, idx)=>(
            <p key={ele + 'salt' + idx}>{ele}</p>
          ))
        :<span>{title}</span>
        )}
        </TitleBox>
        <ListBox>
          {isLoading && <LoadingText />}
          {isLoading || (currentList?.length >= 1 ? currentList?.map((board: any) =>(
            <ItemLink key={board.id} href={`/${board.id}`}>
              <BoardItem {...board}></BoardItem>
            </ItemLink>
          ))
        :
        <EmptyIconBox>
          <EmojiDizzyFill />
          <span>아직 만들어진 게시물이 없네요..</span>
        </EmptyIconBox>
        )}
        </ListBox>
      </CategoryContainer>
    </CategoryWrap>
  );
};

export default BoardWrapComp;

const CategoryWrap = styled.div`
  position: relative;
  width: 100%;
  padding: 0 50px;
  background: linear-gradient(to right, rgba(11, 11, 22, 0.8) 100%, rgba(11, 11, 22, 0.8) 100%), url(${night_BG.src}) no-repeat center center/cover fixed;
  @media(max-width:1300px){
    padding: 0 3.8461vw;
  }
  @media(max-width:600px){
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

const TitleBox = styled.div`
  text-align: center;
  font-size: 30px;
  padding: 100px 0;
  border-radius: 0 0 100px 100px;
  background: #23262d;
  margin-bottom: 20px;
  transition: font-size .3s;
  span,p:last-child {
    display: inline-block;
    padding: 15px 30px;
    border-bottom: 2px solid ${({ theme }) => theme.color.err};
  }
  @media(max-width:1300px){
    padding: 7.6923vw 0 ;
    border-radius: 0 0 7.6923vw 7.6923vw;
  }
  @media(max-width:900px){
    font-size: 24px;
    span,p:last-child {
      padding: 15px 30px 10px;
    }
  }
  @media(max-width:700px){
    span,p:last-child {
      padding: 15px 30px 10px;
    }
  }
  @media(max-width:550px){
    font-size: 18px;
  }
`;

const ListBox = styled.div`
  background: #23262d60;
  border-radius: 100px 100px 0 0;
  min-height: 800px;
  height: 1px;
  padding: 100px 50px;
  @media(max-width:1300px){
    padding: 7.6923vw 3.8461vw ;
    border-radius: 7.6923vw 7.6923vw 0 0 ;
  }
  @media(max-width:750px){
    padding: 60px 60px ;
  }
  @media(max-width:600px){
    padding: 60px 40px;
  }
`;

const ItemLink = styled(Link)`
  display: block;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(128, 128, 128, 0.3);
  background: #39486755;
  transform: translateY(0);
  box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  transition: 0.3s;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(128, 128, 128, 1);
    background: #394867d5;
  }
  &+&{
    margin-top: 30px;
  }
`;

const EmptyIconBox = styled(AllCenterFlex)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  svg {
    width: 70px;
    margin-bottom: 30px;
  }
`;
