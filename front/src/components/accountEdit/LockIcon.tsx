import React from 'react';
import styled from 'styled-components';
import {ShieldLock} from "@styled-icons/bootstrap/ShieldLock"
import { FlexEmptyBox } from '@components/signup/signupForm';

const LockIcon = () => {
  return (
    <LockIconBox>
      <FlexEmptyBox />
      <ShieldLock />
      <FlexEmptyBox />
    </LockIconBox>
  );
};

export default LockIcon;


const LockIconBox = styled.div`
  display:flex;
  flex-direction: column;
  align-items:center;
  height:100%;
  min-height: 354px;
  svg{
    width: 50%;
    color:${({theme}) => theme.color.success};
  }
  
`
