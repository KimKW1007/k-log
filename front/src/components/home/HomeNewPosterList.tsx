import React from 'react'
import styled, { keyframes, css } from 'styled-components';
import HomeNewPosterBigItem from './HomeNewPosterBigItem';
import HomeNewPosterSmItem from './HomeNewPosterSmItem';
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';

const HomeNewPosterList = () => {
  const bannerList = new Array(5).fill(undefined).map((val, idx) => idx);

  return (
    <ListWrap>
      <ListContainer>
        <HomeNewPosterBigItem />
        <NewPosterSmList>
          {bannerList.map(ele=>(
            <HomeNewPosterSmItem/>
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
`

const NewPosterSmList = styled.div`
  display:flex;
`