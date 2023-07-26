import Waves from '@components/common/Waves';
import { useQuery } from '@tanstack/react-query';
import customApi from '@utils/customApi';
import React from 'react'
import useIsMount from 'src/hooks/useIsMount';
import styled, { keyframes } from 'styled-components';

const BoardDetail = ({id} : {id : string}) => {
  const {getApi} = customApi(`/board/${id}`);
  const {isMount} = useIsMount();
  const {data} = useQuery(['GET_BOARD',id], getApi,{
    enabled : !!isMount
  })
  return (
    <DetailWrap>
      <DetailTitleBox>
        <Waves/>
      </DetailTitleBox>
    </DetailWrap>
  )
}

export default BoardDetail


const DetailWrap = styled.div`
  position: relative;
  width:100%;
`

const DetailTitleBox = styled.div`
  position: relative;
  height: 500px;
`
