import React from 'react'
import styled, { keyframes,css } from 'styled-components';
import NotFoundImage from "@assets/images/notFound.svg"
import { AllCenterFlex, OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import { NextPage } from 'next';

const NotFoundPage : NextPage = () => {
  return (
    <NotFoundWrap>
      <NotFoundContainer>
        <NotFoundBgBox>
          <NotFoundBg>
            <QuestionText>?</QuestionText>
          </NotFoundBg>
        </NotFoundBgBox>
        <NotFoundContentBox>
          <NotFoundTextBox>
            <h2>
            죄송합니다.
            <br />
            요청하신 페이지를 찾을 수 없습니다.
            </h2>
            <p>
            방문하시려는 페이지의 주소가 잘못 입력되었거나,
            <br />
            페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
            </p>
            <p>입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.</p>
            <p>감사합니다.</p>
          </NotFoundTextBox>
        </NotFoundContentBox>
      </NotFoundContainer>
    </NotFoundWrap>
  )
}

export default NotFoundPage

const QuestionAni = keyframes`
  50%{
    transform: rotate(-20deg);
  }
`


const NotFoundWrap =styled.div`
height: calc(100% - 70px - 141px);
`
const NotFoundContainer =styled(OnlyAlignCenterFlex)`
  position:relative;
  display:flex;
  height:100%;
  max-width: 1100px;
  width:100%;
  margin: 0 auto; 
  justify-content:space-between;
  padding : 40px 0;
  @media(max-width: 890px){
    flex-direction :column;
    justify-content:start;
  }
`

const NotFoundBg =styled.div`
  position:absolute;
  left:0;
  top:0;
  width: 100%;
  height: 100%;
  background : url(${NotFoundImage.src}) no-repeat center left/100% auto;
`

const NotFoundBgBox =styled(OnlyAlignCenterFlex)`
  position: relative;
  width: 215px;
  height: 300px;
  @media(max-width: 890px){
    width: 129px;
    height: 180px;
  }
`

const QuestionText = styled.div`
  position: absolute;
  left:100%;
  top:0;
  font-size : 60px;
  transform: rotate(20deg);
  animation : ${QuestionAni} 2s infinite;
  @media(max-width: 890px){
    font-size : 40px;
  }
`

const NotFoundContentBox =styled(AllCenterFlex)`
  position: relative;
  width: calc(100% - 300px);
  padding: 0 60px;
  flex-direction :column;
  flex-wrap: wrap;
  @media(max-width: 890px){
    width:100%;
    padding: 0 10px;
    word-break:keep-all;
  }
  
`

const NotFoundTextBox= styled.div`
  display: inline-block;
  padding: 80px 0 30px;
  h2{
    line-height: 120%;
  }
  p{
    padding: 10px 0;
    line-height: 120%;
  }

  @media(max-width: 890px){
    padding: 50px 0 ;

  }
`

