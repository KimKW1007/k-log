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
    {id: 4},
    {id: 5},
  ])
  const posterList = new Array(5).fill(undefined).map((val, idx) => idx)
  const wrapRef = useRef<HTMLDivElement>(null)
  const smListRef = useRef<HTMLDivElement>(null)



  
  return (
    <ListWrap>
      <ListContainer>
        <HomeNewPosterBigItem />
        <NewPosterSmList ref={smListRef}>
          {testList.map((ele, idx)=>(
            <HomeNewPosterSmItem key={`${Date.now() + 'salt' + idx}`} wrapRef={wrapRef} smListRef={smListRef} id={ele.id}/>
          ))}
        </NewPosterSmList>
        
      </ListContainer>
      <NewPosterSmWrapList ref={wrapRef}>
        
      </NewPosterSmWrapList>
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
`

const NewPosterSmList = styled.div`
  display:flex;
`

const NewPosterSmWrapList = styled.div`
  display:flex;
  flex-wrap:wrap;
  margin-top : 30px;
`