import React, { useEffect, useState } from 'react';
import { Search } from '@styled-icons/fluentui-system-filled/Search';
import { useFormContext } from 'react-hook-form';
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import styled, { keyframes } from 'styled-components';
import { X } from '@styled-icons/bootstrap/X';


interface SearchInputBoxProps {
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>

}

const SearchInputBox = ({setIsTyping} : SearchInputBoxProps) => {
  const {register, watch, setValue, setFocus} = useFormContext();


  useEffect(() => {
    setFocus("search")
  }, [])

  return (
    <SeachInputBox>
      <SeachInputInnerBox>
        <SearchIconBox>
          <Search />
        </SearchIconBox>
        <SearchInput
          {...register('search',{
            onChange: ()=>setIsTyping(true)
          })}
          type="text"
          placeholder="검색어를 입력하세요"
          autoComplete="off"
          maxLength={50}
        />
        {watch('search')?.length > 0 && (
          <CleanBtn
            type="button"
            onClick={() => {
              setValue('search', '');
              setFocus("search")
            }}>
            <X />
          </CleanBtn>
        )}
      </SeachInputInnerBox>
    </SeachInputBox>
  )
}

export default SearchInputBox

const CleanBtnAni = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;

const SeachInputInnerBox = styled(OnlyAlignCenterFlex)`
  width: 100%;
  padding: 0 10px;
  border: 2px solid ${({ theme }) => theme.color.success};
  border-radius: 4px;
  overflow: hidden;
`;

const SeachInputBox = styled(OnlyAlignCenterFlex)`
  width: 100%;
  padding: 0 20px;
`;
const SearchIconBox = styled.div`
  width: 30px;
  flex-shrink: 0;
  svg {
    width: 100%;
    color: #fff;
  }
`;

export const CleanBtn = styled.button`
  width: 30px;
  height: 30px;
  background: transparent;
  height: 100%;
  border-radius: 50%;
  transition: 0.2s;
  svg {
    opacity: 0;
    animation: ${CleanBtnAni} 0.2s forwards;
    width: 100%;
    color: #fff;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  line-height: 34px;
  font-size: 16px;
  outline: 0;
  padding: 10px 10px 10px 10px;
  background: transparent;
  color: #fff;
  &::placeholder {
    font-size: 16px;
    margin-top: 20px;
    color: #ffffffb1;
  }
`;