import styled, { keyframes } from 'styled-components';
import React from 'react'
import {Search} from "@styled-icons/fluentui-system-filled/Search"
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import { useRecoilState } from 'recoil';
import { searchModalState } from '@atoms/atoms';
const SearchBox = () => {
  const [isOpenSeachModal, setIsOpenSearchModal] = useRecoilState(searchModalState);
  return (
    <SearchArea>
      <SearchInputBox onClick={()=>setIsOpenSearchModal(true)}>
        <SearchInput  placeholder='검색어를 입력하세요'/>
        <SubmitBtnBox>
          <SubmitBtn >
            <Search />
          </SubmitBtn>
        </SubmitBtnBox>
      </SearchInputBox>
    </SearchArea>
  )
}

export default SearchBox



const SearchInputBox = styled.button`
  position: relative;
  width:100%;
  border-radius: 30px;
  overflow:hidden;
`

const SearchInput = styled(OnlyAlignCenterFlex)`
  width:100%;
  height: 50px;
  font-size: 13px;
  padding: 6px 50px 6px 20px;
  background:#545454;
  outline: none;
  color: #fff;
  font-weight: 700;
  &:after{
    content:'검색어를 입력하세요';
    font-size: 14px;
    color: #fff;
    font-weight:bold;
    margin-left : 10px;
  }

`

const SubmitBtnBox = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
  height: 50px;
  border-radius: 30px;
  overflow:hidden;
  
`

const SubmitBtn=  styled.span<{isEdit?: boolean}>`
  width:100%;
  height:100%;
  padding: 8px;
  display:block;
  background:#898989;
  border-radius: 30px;
  transition: .2s;
  border : 2px solid transparent;
  svg{
    width:100%;
    color: #fff;
  }
  &:hover{
    background:#434343;
    border : 2px solid #898989;
  }
`

const SearchArea = styled.div`
  position: relative;
  z-index : 2;
  width:100%;
  max-width: 290px;
`