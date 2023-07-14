import styled, { keyframes } from 'styled-components';
import React from 'react'
import {Search} from "@styled-icons/fluentui-system-filled/Search"
  const SearchBox = () => {
  return (
    <SearchForm>
      <SearchInputBox >
        <SearchInput  placeholder='검색어를 입력하세요'/>
        <SubmitBtnBox>
          <SubmitBtn >
            <Search />
          </SubmitBtn>
        </SubmitBtnBox>
      </SearchInputBox>
    </SearchForm>
  )
}

export default SearchBox

const SearchForm = styled.form`
  position: relative;
  z-index : 2;
  width:100%;
`

const SearchInputBox = styled.div`
  position: relative;
  width:100%;
`

const SearchInput = styled.input`
  width:100%;
  line-height: 30px;
  font-size: 13px;
  padding: 6px 50px 6px 20px;
  background:#545454;
  outline: none;
  border-radius: 30px;
  color: #fff;
  font-weight: 700;
  &::placeholder{
    font-size: 12px;
    color: #fff;
    font-weight:bold;
    letter-spacing: -1px;
  }

`

const SubmitBtnBox = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 42px;
  height: 42px;
  border-radius: 30px;
  overflow:hidden;
  
`

const SubmitBtn=  styled.button<{isEdit?: boolean}>`
  width:100%;
  height:100%;
  padding: 8px;
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