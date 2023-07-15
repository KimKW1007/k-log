import { AllCenterFlex } from '@components/common/CommonFlex';
import { banner1 } from '@utils/bannerList';
import React from 'react'
import styled, { keyframes, css } from 'styled-components';

const HomeNewPosterSmItem = () => {
  return (
    <SmItemBox>
      <SmItemInnerBox>
        <SmItemBg />
        <SmItemTextBox>
          <SmPosterCategory>
            <p>개발공부/네스트 | nest.js</p>
          </SmPosterCategory>
          <SmPosterTItle>
            <h3>Repository란?</h3>
          </SmPosterTItle>
        </SmItemTextBox>
      </SmItemInnerBox>
    </SmItemBox>
  )
}

export default HomeNewPosterSmItem

const SmItemBox = styled.div`
  position: relative;
  width: 120px;
  height: 400px;
  border : 1px solid #fff;
  border-radius: 10px;
  overflow: hidden;
  &+&{
    margin-left: 10px;
  }
`
const SmItemInnerBox = styled(AllCenterFlex)`
  position: absolute;
  transform-origin: left top;
  transform : rotate(90deg);
  width:400px;
  height:120px;
  left: 100%;
  top: 0%;
`

const SmItemBg = styled.div`
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  transform : translate(-50%, -50%);
  background : url(${banner1}) no-repeat center center/110% 110%;
  width:90%;
  height:80%;
  border-radius: 10px;
  overflow: hidden;
`
const SmItemTextBox = styled.div`
  position: relative;
  z-index: 2;
  background: #232323;
  width: 80%;
  height: 70%;
  border-radius: 10px;
  padding: 10px;
`

const SmPosterCategory= styled.div`
  p{
    font-size : 16px;
  }
`
const SmPosterTItle= styled.div`
  h3{
    font-size : 26px;
  }

`