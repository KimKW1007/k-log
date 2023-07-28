import React from 'react'
import styled, { keyframes } from 'styled-components';

const Waves = () => {
  return (
    <WaveWrap>
      <WaveBox>
        <WaveOne></WaveOne>
        <WaveTwo></WaveTwo>
        <WaveThree></WaveThree>
      </WaveBox>
    </WaveWrap>
  )
}

export default Waves

const drift = keyframes`
  from { transform: rotate(0deg); }
  from { transform: rotate(360deg); }
`

const WaveWrap = styled.div`
  width:100%;
  height: 400px;
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  transform: translate3d(0, 0, 0);
`

const WaveBox =styled.div`
  position :absolute;
  left: 50%;
  bottom: 0;
  width:150vw;
  height:150vw;
  transform : translateX(-50%);
`

const Wave = styled.div`
opacity: .4;
position: absolute;
top:  0;
left: 0;
background: #0af;
width: 100%;
height: 100%;
border-radius: 43%;
animation: ${drift} 10s infinite linear;
`
const WaveOne = styled(Wave)``
const WaveTwo = styled(Wave)`
  animation: ${drift} 13s infinite linear;
  opacity: .1;
  background: yellow;
`
const WaveThree = styled(Wave)`
animation: ${drift} 11s infinite linear;

`