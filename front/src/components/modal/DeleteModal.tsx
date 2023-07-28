import React from 'react'
import ModalPortal from './ModalPortal';
import { Dim, ModalBox, ModalInnerText, ModalTitle, ModalWrap } from './CommonModal';
import styled from 'styled-components';
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';

interface DeleteMadalProps {
  onClose: ()=> void;
  mutate : any;
}
const DeleteModal = ({onClose, mutate}: DeleteMadalProps) => {
  return (
    <ModalPortal>
    <ModalWrap>
      <Dim/>
      <DeleteModalBox>
        <ModalTitle>안내</ModalTitle>
        <ModalInnerText>
          <p>해당 게시물을</p>
          <p>삭제하시겠습니까?</p>
        </ModalInnerText>
        <ConfirmBtnBox>
          <DeleteBtn onClick={()=> mutate({})}>
            네! 삭제할래요!
          </DeleteBtn>
          <CancelBtn onClick={onClose}>
            다시 생각해볼게요..
          </CancelBtn>
        </ConfirmBtnBox>
      </DeleteModalBox>
    </ModalWrap>
  </ModalPortal>
  )
}

export default DeleteModal

const DeleteModalBox = styled(ModalBox)`
  max-width: 500px;
  width:100%;
`

const ConfirmBtnBox = styled(OnlyAlignCenterFlex)`

`
const DefaultBtn = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  border-radius :10px;
  color: #fff;
  transition: .2s;
`
const DeleteBtn = styled(DefaultBtn)`
  background :${({theme }) => theme.color.err};
  &:hover{
    background: #F31559;
  }
`
const CancelBtn = styled(DefaultBtn)`
  background :#454545;
  &:hover{
    background :#676767;
  }
`
