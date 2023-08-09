import { AllCenterFlex, OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import { FormatColorReset } from '@styled-icons/material-rounded';
import { useQuery } from '@tanstack/react-query';
import customApi from '@utils/customApi';
import { GET_PROJECTS } from '@utils/queryKeys';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import useInfinityRolling from 'src/hooks/useInfinityRolling';
import styled, { keyframes, css } from 'styled-components';


const ProjectSlide = () => {
  const containerList = new Array(2).fill(undefined).map((val, idx) => idx);

  const [newData, setNewData] = useState<{id : number; title : string; link : string}[]>([]);

  const {getApi} = customApi('/banner/projects');
  const {data} = useQuery([GET_PROJECTS], ()=>getApi());

  const MINLENGTH = 9;

  useEffect(()=>{
    if(data){
      if(data?.length > 0 && data?.length <= 9){
        let newArr = [...data]
        for(let i = 0; i < MINLENGTH; i++){
          if(newArr.length < MINLENGTH){
            newArr = [...newArr, ...data];
          }else{
            break;
          }
        }
        setNewData(newArr);
      }else{
        setNewData(data)
      }
    }
  },[data])



  const {ref1, ref2, onMouseOver,onMouseLeave } = useInfinityRolling(newData);

  return (
    <SlideArea>
      {data?.length > 0 && <SlideWrap >
        {containerList.map((_: any, idx:  number)=>(
          <SlideContainer key={idx + 'salt'} ref={idx === 0 ? ref1 : ref2} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
            {newData && newData.map(({id, title, link}, index) =>(
                <SlideItem key={idx + id + 'salt' + index}>
                  <Link href={link} target='_blank'>{title}</Link>
                </SlideItem>
              ))}
        </SlideContainer>
        ))}
      </SlideWrap>}
    </SlideArea>
  )
}

export default ProjectSlide

const bannerAni = keyframes`
  50%{
    text-shadow: #fc0 0px 0 5px;
  }

`


const SlideItem = styled(AllCenterFlex)`
  width:100%;
  height:100%;
  padding: 0 30px;
  &:nth-child(2n){
    a{
      animation: ${bannerAni} 2s .6s infinite;
    }
  }
  &:nth-child(3n){
    a{
      animation: ${bannerAni} 2s 1.7s infinite;
    }
  }
  a{
    display:block;
    text-align:center;
    transition: .2s;
    font-size: 17px;
    white-space: nowrap;
    animation: ${bannerAni} 2s infinite;
    
    &:hover{
      animation:none;
      text-shadow: #0cf 0px 0 5px;
    }
  }
`


const SlideArea = styled.div`
  width:100%;
  max-width: 1170px;
  height: 80px;
  padding: 0 60px;
  margin: 0 auto;
  transition: padding .3s;
  @media(max-width:937px){
    margin: 50px auto 0;
    padding: 0;
  }
`

const SlideWrap = styled.div`
position:relative;
width:100%;
height:100%;
border-top: 4px solid #4F4557;
border-bottom: 4px solid #4F4557;
overflow:hidden;

`

const SlideContainer = styled(OnlyAlignCenterFlex)`
  position:absolute;
  left : 0px;
  height:100%;
`