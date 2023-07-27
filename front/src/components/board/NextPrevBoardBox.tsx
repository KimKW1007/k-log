import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import React from 'react'
import styled, { css, keyframes } from 'styled-components';
import {ArrowBack , ArrowForward} from "@styled-icons/ionicons-solid"
import Link from 'next/link';
import defaultImage from '@assets/images/500_94.jpg';

interface NextPrevBoardBoxProps{
  [key: string]  : any
}

const NextPrevBoardBox = ({ title, id, thumbnail, type}: NextPrevBoardBoxProps) => {
  return (
    <AnotherBoardLink title={title} href={`/category/${id}`} isPrev={type === 'prev'}>
      <AnotherBoardBg thumbnail={thumbnail ? thumbnail : defaultImage.src} />
      <AnotherBoardBox >
        {type === 'prev' && <ArrowBack/>}
        <AnotherBoardTitleBox isNext={type === 'next' }>
          <span>{type==='prev' ? '이전 포스트' : "다음 포스트"}</span>
          <div>{title}</div>
        </AnotherBoardTitleBox>
        {type === 'next' && <ArrowForward/>}
      </AnotherBoardBox>
    </AnotherBoardLink>
  )
}

export default NextPrevBoardBox

const movePrevArrow = keyframes`
  50%{
    transform : translateX(-5px);
  }
`
const moveNextArrow = keyframes`
  50%{
    transform : translateX(5px);
  }
`


const AnotherBoardBg = styled.div<{thumbnail : string;}>`
position: absolute;
z-index: 2;
left:0;
top:0;
background : linear-gradient(to right, rgba(0,0,0,.7)100%, rgba(0,0,0,.7) 100%), url(${({thumbnail}) => thumbnail}) no-repeat center center/cover;
transform :scale(1.05);
filter: blur(5px);
transition: .6s;
width:100%;
height:100%;
`
const AnotherBoardBox = styled(OnlyAlignCenterFlex)`
  position: relative;
  z-index: 2;
  width: 300px;
  height: 100px;
  padding: 0 15px;
  overflow:hidden;
  > svg{
    width: 30px;
    flex-shrink: 0;
  }
`
const AnotherBoardTitleBox = styled.div<{isNext : boolean;}>`
  padding: 0 0 0 20px;
  overflow:hidden;
  flex:1;
  > span{
    display:inline-block;
    margin-bottom: 6px;
    font-size :14px;
  }
  > div{
    font-size :18px;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  ${({isNext}) => isNext&& `
    text-align:right;
    padding: 0 20px 0 0 ;
  `}
`
const AnotherBoardLink = styled(Link)<{isPrev : boolean;}>`
  position: relative;
  overflow:hidden;
  border : 1px solid rgba(128,128,128,0.3);
  border-radius: 10px;
  &:hover{
    ${AnotherBoardBg}{
      transform :scale(1.2);
    }
    ${AnotherBoardBox}{
      > svg{
        ${({isPrev}) => isPrev ? css`
        animation : ${movePrevArrow} 1s infinite;
        ` : css`
        animation : ${moveNextArrow} 1s infinite;
        `}
      }
    }
   
  }

`