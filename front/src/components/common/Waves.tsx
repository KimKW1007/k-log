import React from 'react'
import styled, { keyframes } from 'styled-components';

const Waves = () => {
  return (
    <WaveWrap>
      <WaveOne></WaveOne>
      <WaveTwo></WaveTwo>
      <WaveThree></WaveThree>
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
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
`
const Wave = styled.div`
opacity: .4;
position: absolute;
bottom: -10%;
left: -10%;
background: #0af;
width: 150vw;
height: 150vw;
margin-left: -250px;
margin-top: -250px;
transform-origin: 50% 48%;
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