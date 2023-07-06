import styled, { keyframes } from 'styled-components';
import React from 'react'
import {Search} from "@styled-icons/fluentui-system-filled/Search"
const SearchBox = () => {
  return (
    <SearchForm>
      <SearchInputBox>
        <SearchInput placeholder='검색어를 입력하세요'/>
        <SubmitBtnBox>
          <SubmitBtn>
            <Search />
          </SubmitBtn>
        </SubmitBtnBox>
      </SearchInputBox>
    </SearchForm>
  )
}

export default SearchBox

const SearchForm = styled.form`
  width:100%;
`

const SearchInputBox = styled.div`
  position: relative;
  width:100%;
  padding: 0 30px;
`

const SearchInput = styled.input`
  width:100%;
  line-height: 30px;
  font-size: 13px;
  padding: 6px 50px 6px 20px;
  background:#f2f2f8;

  outline: none;
  border-radius: 30px;
  &::placeholder{
    font-size: 12px;
    color: #a5a5a5;
    font-weight:bold;
    letter-spacing: -1px;
  }
`

const SubmitBtnBox = styled.div`
  position: absolute;
  right: 30px;
  top:0;
  width: 44px;
  height: 44px;
  border-radius: 30px;
  overflow:hidden;
`

const SubmitBtn=  styled.button`
  width:100%;
  height:100%;
  padding: 8px;
  background:#454545;
  svg{
    width:100%;
    color: #fff;
  }

`