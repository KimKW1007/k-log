import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { AllCenterFlex } from '../CommonFlex';
import LoadingText from './LoadingText';

const PageLoading = ({isLoading , isCreate} : {isLoading : boolean; isCreate ?: boolean;}) => {
  const [isShow, setIsShow] = useState(true);
  const [isOpacity, setIsOpacity] = useState(false);
  useEffect(()=>{
    let loadTimer: string | number | NodeJS.Timeout | undefined;
    clearTimeout(loadTimer)
    if(!isLoading){
      loadTimer = setTimeout(()=>{
        setIsOpacity(true);
        setTimeout(()=>{
          setIsShow(false);
        },1500)
      },100)
    }
    return ()=>{clearTimeout(loadTimer)}
  },[isLoading])
  return (
    <>
    {isShow && <PageLoadingWrap isLoading={isOpacity}>
      <PageLoadingDim/>
      <LoadingBox>
        <LoadingText>{isCreate && '생성 중'}</LoadingText>
      </LoadingBox>
    </PageLoadingWrap>}
    </>
  )
}

export default PageLoading

const PageLoadingWrap = styled(AllCenterFlex)<{isLoading : boolean;}>`
  position:fixed;
  z-index: 100;
  width:100%;
  height:100%;
  left: 0;
  top : 0;
  opacity: 1;
  transition : 1.5s;
  ${({isLoading}) => isLoading &&`
    opacity: 0;
  `}

`
const PageLoadingDim = styled.div`
  position :absolute;
  z-index : 1;
  width:100%;
  height:100%;
  left: 0;
  top : 0;
  background : rgba(34,34,34,.95);
`

const LoadingBox = styled.div`
  position: relative;
  z-index : 3;
  width: 120px;
  height: 120px;
  background :#454545a1;
  border-radius: 10px;
  overflow:hidden;
`