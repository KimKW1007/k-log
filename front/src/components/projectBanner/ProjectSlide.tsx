import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import { FormatColorReset } from '@styled-icons/material-rounded';
import React, { useEffect } from 'react'
import useInfinityRolling from 'src/hooks/useInfinityRolling';
import styled, { keyframes, css } from 'styled-components';


const ProjectSlide = () => {
  const bannerList = new Array(12).fill(undefined).map((val, idx) => idx);
  const {ref1, ref2, onMouseOver,onMouseLeave } = useInfinityRolling();

  

  return (
    <SlideArea>
      <SlideWrap >
        <SlideContainer ref={ref1} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
        {bannerList.map(ele =>(
          <div>banner{ele + 1}</div>
        ))}
        </SlideContainer>
        <SlideContainer ref={ref2} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
        {bannerList.map(ele =>(
          <div>banner{ele + 1}</div>
        ))}
        </SlideContainer>
      </SlideWrap>
    </SlideArea>
  )
}

export default ProjectSlide
const slider = keyframes`
  0%{translateX(0px)}
  100%{translateX(-1170px)}
`

const SlideArea = styled.div`
  width: 1170px;
  height: 80px;
  padding: 0 60px;
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
  >div{
    padding: 0 30px;
  }
`