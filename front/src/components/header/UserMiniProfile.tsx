import React from 'react'
import styled from 'styled-components';
import { userInfomation } from '@src/atoms/atoms';
import { useRecoilState } from 'recoil';
import {ArrowDropDown} from '@styled-icons/material-rounded'
const UserMiniProfile = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfomation);

  return (
    <UserPlBox>
      <UserPlInnerBox>
        <span>{userInfo?.userName}</span>
        <ArrowIcon/>
      </UserPlInnerBox>
    </UserPlBox>
  )
}

export default UserMiniProfile

const UserPlBox = styled.div`
  position: relative;
  
`

const UserPlInnerBox = styled.div`
  position: relative;
  background: #d5d5d5;
  border-radius: ${({theme}) => theme.rem.p10} ;
  font-size: ${({theme}) => theme.rem.p14} ;
  overflow:hidden;
  span{
    display:block;
    padding:  8px  ${({theme}) => theme.rem.p34} 8px 16px ;
    pointer-events: none;
    font-weight:bold;
    letter-spacing: .5px;
  }
  &:hover{
    svg{
      transform: translateY(-50%) rotate(180deg);
    }
  }
`

const UserPlHoverBox = styled.div`
  
`

const ArrowIcon = styled(ArrowDropDown)`
  position: absolute;
  right: 2px;
  top:50%;
  transform: translateY(-50%);
  width: 2em;
  transition: .3s;
`


