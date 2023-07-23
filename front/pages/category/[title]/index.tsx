import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styled,{keyframes} from 'styled-components';
import type { NextPage } from 'next';
import useIsMount from 'src/hooks/useIsMount';
import BoardItem from '@components/board/BoardItem';
import {banner1, banner2, banner3} from '@utils/bannerList';
import night_BG from '@assets/images/dark_night.jpg';
import Link from 'next/link';

const CategoryPage: NextPage = () => {
  const router = useRouter();
  const {isMount} = useIsMount();
  return (
    <CategoryWrap>
      <CategoryContainer>
        <TitleBox>
          <span>{isMount && router.query.title}</span>
        </TitleBox>
        <ListBox>
          <Link href={'/1'}>
            <BoardItem></BoardItem>
          </Link>
        </ListBox>
      </CategoryContainer>
    </CategoryWrap>
  )
}

export default CategoryPage

const CategoryWrap = styled.div`
  position: relative;
  width:100%;
  padding: 0 50px ;
  background: linear-gradient(to right, rgba(11,11,22,.8) 100%, rgba(11,11,22,.8) 100% ),  url(${night_BG.src}) no-repeat center center/cover fixed;
`

const CategoryContainer = styled.div`
    position: relative;
    z-index: 2;
    width:100%;
    max-width: 1200px;
    margin :0 auto;

`


const TitleBox = styled.div`
  text-align:center;
  font-size :30px;
  padding: 100px 0 ;
  border-radius: 0 0 100px 100px;
  background: #23262d;
  margin-bottom: 20px;
  span{
    display:inline-block;
    padding: 15px 30px;
    border-bottom: 2px solid ${({theme}) => theme.color.err};
  }
`

const ListBox = styled.div`
background: #23262d60;
border-radius: 100px 100px  0 0; 

  padding: 100px 50px;
`