import React, { useEffect } from 'react'
import styled, {keyframes} from 'styled-components';
import ModalPortal from '@components/modal/ModalPortal';
import { ModalWrap, Dim } from '@components/modal/CommonModal';
import { DeleteModalBox } from '@components/modal/DeleteModal';
import {Search} from "@styled-icons/fluentui-system-filled/Search"
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import { useForm } from 'react-hook-form';
import { X } from '@styled-icons/bootstrap/X';
import { useRecoilState } from 'recoil';
import { searchModalState } from '@atoms/atoms';

const SeachModal = ({onClose,boards}: { onClose: ()=> void; boards: any }) => {
  const [isOpenSearchModal, setIsOpenSearchModal] = useRecoilState(searchModalState);
  const { register, setValue, watch }  = useForm({mode:"onSubmit"})
  const handleKeyDown = (e: { code: string; }) => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  useEffect(() => {
    if (isOpenSearchModal) {
      window.addEventListener("keydown", handleKeyDown);
    }
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpenSearchModal]);





  return (
    <ModalPortal>
      <SearchWrap>
        <SearchDim onClick={onClose}/>
        <SearchModalBox>
          <ModalInnerBox>
            <SeachInputBox>
              <SeachIconBox>
                <Search />
              </SeachIconBox>
              <SearchInput {...register("search")} type='text' placeholder='검색어를 입력하세요' autoComplete="off" />
              {watch('search')?.length > 0 && <CleanBtn type='button' onClick={()=>{}}>
                <X/>
              </CleanBtn>}
            </SeachInputBox>
            {watch('search')?.length > 0 || 
            <NoRecentSearches>
                <p>No Recent Searches</p>
            </NoRecentSearches>}

          </ModalInnerBox>
        </SearchModalBox>
      </SearchWrap>
    </ModalPortal>
  )
}

export default SeachModal

const CleanBtnAni = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }

`

const SearchModalBox= styled(DeleteModalBox)`
  margin: 100px auto auto;
  border-radius: 4px;
  background :#454545;
  color:#fff;
`

const SearchWrap = styled(ModalWrap)`
  display:block;
`

const SearchDim = styled(Dim)`
  background: rgba(0,0,0,.5);
`


const NoRecentSearches = styled.div`
  padding: 56px 0 36px;
  text-align:center;
  font-size: 14px;
  color: #ffffffa1;
`

const ModalInnerBox = styled.div`
  width:100%;
`

const SeachInputBox= styled(OnlyAlignCenterFlex)`
  width:100%;
  padding: 0 10px;
  border : 2px solid ${({theme}) => theme.color.success};

`
const SeachIconBox=styled.div`
  width:30px;
  flex-shrink : 0;
  svg{
    width:100%;
    color: #fff;
  }
`

const CleanBtn = styled.button`
  width: 30px;
  height:30px;
  background:transparent;
  height:100%;
  border-radius:50%;
  transition: .2s;
  svg{
    opacity: 0;
    animation: ${CleanBtnAni} .2s forwards;
    width:100%;
    color: #fff;
  }
  &:hover{
    background :rgba(0,0,0,.2);
  }
`

const SearchInput = styled.input`
  width: 100%;
  line-height: 34px;
  font-size : 16px;
  outline: 0;
  padding: 10px 10px 10px 10px;
  background: transparent;
  color:#fff;
  &::placeholder{
    font-size : 16px;
    margin-top: 20px;
    color:#fff;
  }
`
