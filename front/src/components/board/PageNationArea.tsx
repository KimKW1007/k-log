import { AllCenterFlex } from '@components/common/CommonFlex';
import React, { useEffect, useState } from 'react'
import styled, { keyframes, css } from 'styled-components';
import { IosArrowLtr, IosArrowRtl } from '@styled-icons/fluentui-system-filled'
import { useRecoilState } from 'recoil';
import { currentPagenation } from '@atoms/atoms';
import useIsMount from 'src/hooks/useIsMount';


const PageNationArea = ({lastPage, title} : {lastPage :number; title : string;}) => {
  const [currentPage, setCurrentPage] = useRecoilState(currentPagenation);
  const [pageNation, setPageNation] = useState<number[]>([]);
  const {isMount} = useIsMount();
  const [pageDotState, setPageDotState] = useState([false, false]);

  const handlePageNation = (page: number) => ()=>{
    setCurrentPage(page)
    window.scrollTo(0,0)
  }

  const onClickPrevBtn = ()=>{
    if(currentPage <= 1) return;
    setCurrentPage( prev => prev - 1);
  }

  const onClickNextBtn = ()=>{
    if(currentPage >= lastPage) return;
    setCurrentPage( prev => prev + 1);
  }

  const conditionOfDisappear = (page : number)=>{
    if(lastPage >= 6){
      if(currentPage <= 3){
        return Boolean(page > 4) 
      }else if(currentPage > lastPage - 3){
        return Boolean(page < lastPage - 3) 
      }else{
        const nextPage = currentPage + 1;
        const prevPage = currentPage - 1;
        return page !== nextPage && page !== prevPage && page !==  currentPage;
      }
    }
  }

  useEffect(()=>{
    if(lastPage >= 6){
      if(currentPage <= 3){
        setPageDotState([false, true])
      }else if(currentPage > lastPage - 3){
        setPageDotState([true, false])
      }else{
        setPageDotState([true, true])
      }
    }
  },[currentPage])


  useEffect(()=>{
    setPageNation(new Array(lastPage).fill(undefined).map((val, idx) => idx + 1))
  },[isMount])

  return (
    <PageNationBox>
      <PrevPageBtn onClick={onClickPrevBtn}>
        <IosArrowLtr />
      </PrevPageBtn>
      <PageBox>
        <PageBtn onClick={handlePageNation(1)} isActive={1 === currentPage}>1</PageBtn>
        {pageDotState[0] && <PageDot>&#183;&#183;&#183;</PageDot>}
        { lastPage > 2 && pageNation.slice(1,lastPage-1).map(page =>(
          <PageBtn onClick={handlePageNation(page)} isDisappear={conditionOfDisappear(page)} isActive={page === currentPage}>{page}</PageBtn>
        ))}
        {pageDotState[1] && <PageDot>&#183;&#183;&#183;</PageDot>}
        {lastPage >= 2 && <PageBtn onClick={handlePageNation(lastPage)} isActive={lastPage === currentPage}>{lastPage}</PageBtn>}
      </PageBox>
      <NextPageBtn onClick={onClickNextBtn}>
        <IosArrowRtl />
      </NextPageBtn>
    </PageNationBox>
  )
}

export default PageNationArea


const PageNationBox = styled(AllCenterFlex)`
  width:100%;
  margin-top: 100px;
`

const PageBox = styled(AllCenterFlex)`
  margin: 0 20px;
`

const PageDot = styled(AllCenterFlex)`
width:30px;
height:30px;
background :transparent;
border-radius: 50%;
overflow: hidden;
user-select: none;
&:hover{
  background :rgba(255,255,255,.2);
}
`


const PageBtn = styled.button<{isActive ?: boolean; isDisappear ?: boolean;}>`
  padding:  0 10px;
  user-select: none;
  height: 28px;
  border-radius :4px;
  background : rgba(255,255,255,.2);
  color :#fff;
  margin: 0 5px;
  ${({isActive}) => isActive ? css`
    padding:  0 12px;
    height: 30px;
    background : rgba(255,255,255,1);
    color :#232323;
  ` : css`
    &:hover{
      background : rgba(255,255,255,.4);
    }
  `}
  ${({isDisappear}) => isDisappear && `
    display: none;
  `}
`
const PrevNextCommonBtn = styled.button`
  width:34px;
  height:34px;
  user-select: none;
  padding: 7px;
  background :transparent;
  border-radius: 50%;
  overflow: hidden;
  transition: .2s;
  svg{
    color:#fff;
    width:100%;
  }
  &:hover{
    background :rgba(255,255,255,.2);
  }
`
const PrevPageBtn = styled(PrevNextCommonBtn)`
  svg{
    margin-left: 2px;
  }
`
const NextPageBtn = styled(PrevNextCommonBtn)`
svg{
  margin-left: -4px;
}
`