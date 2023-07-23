import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes, css } from 'styled-components';
import HomeNewPosterBigItem from './HomeNewPosterBigItem';
import HomeNewPosterSmItem from './HomeNewPosterSmItem';
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';

const HomeNewPosterList = () => {
  const [testList , setTestList] = useState([
    {id: 1},
    {id: 2},
    {id: 3},
  ])
  const [wrapList, setWrapList] = useState([])




  
  return (
    <ListWrap>
      <ListContainer>
        <HomeNewPosterBigItem />
        <NewPosterSmList >
          {testList.map((ele, idx)=>(
            <HomeNewPosterSmItem key={`${ele.id +'salt' + idx}`} />
          ))}
        </NewPosterSmList>
      </ListContainer>
    </ListWrap>
  )
}

export default HomeNewPosterList

const ListWrap = styled.div`
  width:100%;
  margin-bottom: 30px;
`

const ListContainer = styled.div`
  width:100%;
  display:flex;
  @media (max-width: 1020px){
    display:block;
  }
`

const NewPosterSmList = styled.div`
  width:530px;
  display:flex;
  flex-direction : column;
  @media (max-width: 1280px){
    width: 41.4062vw;
  }
  @media (max-width: 1020px){
    width: 100%;
    margin-top: 30px;
  }
`

const NewPosterSmWrapList = styled.div`
  display:flex;
  flex-wrap:wrap;
  margin-top : 30px;

`