import { AllCenterFlex, OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import { banner1 } from '@utils/bannerList';
import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes, css } from 'styled-components';

const HomeNewPosterSmItem = () => {

  return (
    <SmItemBox>
      <SmItemInnerBox >
        <SmPosterCategory>
          <span>
            JavaScript
          </span>
        </SmPosterCategory>
        <SmPosterTitle>
          Mapping에 관하여
        </SmPosterTitle>
        <AuthorBox>
          
          <Author>
          <div></div>
            <span>뭘봐</span>
          </Author>
          <CreateAt>2023.07.17</CreateAt>
        </AuthorBox>
      </SmItemInnerBox>
    </SmItemBox>
  )
}

export default HomeNewPosterSmItem

const SmItemBox = styled.div`
  position: relative;
  width: 100%;
  padding : 15px;
  border : 1px solid #fff;
  border-radius: 10px;
  &+&{
    margin-top : 20px;
  }

`
const SmItemInnerBox = styled.div`
  width:100%;
  padding : 10px 0;
  border : 1px solid red;

`

const SmPosterCategory= styled.div`
  margin-bottom: 20px;
  span{
    font-size : 12px;
    background: #75C2F6;
    display:inline-block;
    padding: 10px 15px;
    border-radius: 20px;
  }
`
const SmPosterTitle= styled.div`
  font-size : 20px;
  margin-bottom : 20px;
`

const AuthorBox = styled(OnlyAlignCenterFlex)`
justify-content:space-between;
`

const Author = styled(OnlyAlignCenterFlex)`
>div{
  width: 20px;
  height: 20px;
  border : 1px solid #fff;
  margin-right :10px;
}
  
`
const CreateAt = styled.span``