import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import React, { useRef, useState } from 'react'
import styled, { keyframes, css } from 'styled-components';
import Image from 'next/image';
import defaultAuthorImage from '@assets/images/500_94.jpg'
import { Comment } from '@styled-icons/fluentui-system-filled/Comment'
import { useForm } from 'react-hook-form';
import checkedIcon from '@images/check.svg';
import { CheckBoxInput, Label } from '@components/common/CheckBoxInputs';



interface CommentFormProps{
  isReply ?: boolean; 
  isWriter ?: boolean;
  id : string
}


const CommentForm = ({isReply, isWriter} : CommentFormProps) => {
  const [row, setRow] = useState(1);
  const resizeTextarea = (e : any) => {
    const { value } = e.target;
    setRow(value.split("\n").length)
  };

  const {register, handleSubmit} = useForm({mode: 'onSubmit'})

const onSubmit =(data : any)=>{

}
  return (
    <Form isReply={isReply} isWriter={isWriter} onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <AuthorBox>
          <AuthorInnerBox>
            <AuthorImageBox>
              <Image src={defaultAuthorImage.src} alt={'유저 이미지'} width={30} height={30} />
            </AuthorImageBox>
            <Author>
              <span>{isReply ? "To . 관리자" : 'From . 관리자'}</span>
            </Author>
          </AuthorInnerBox>
        </AuthorBox>
        <CommentBox>
          <CommentInnerBox>
            <CommentTextArea 
            row={row}
            onChange={resizeTextarea}
            placeholder={`여러분의 댓글은 저에게 큰 힘이 됩니다.\n구독과 좋아요..아 이게아니지..\n대댓글이 작성 될 경우 삭제가 불가능 합니다.`}
            >
            </CommentTextArea>
            <SubmitBox>
              <SubmitBtn>
                <Comment title={'댓글 달기'} />
              </SubmitBtn>
            </SubmitBox>
          </CommentInnerBox>
          <CheckSecretInputBox>
            <CheckSecretInput className="blind" type='checkbox' id={'secretInput'}/>
            <CheckSecretLabel htmlFor={'secretInput'}>비밀글 작성</CheckSecretLabel>
          </CheckSecretInputBox>
        </CommentBox>
      </FormContainer>
    </Form>
  )
}

export default CommentForm

const CheckSecretInputBox =styled.div`
  margin: 10px 0 0 10px;

`

const CheckSecretInput = styled(CheckBoxInput)`
&:checked + label {
  &::before {
    background-color: ${({theme}) => theme.color.success};
  }
}

`

const CheckSecretLabel = styled(Label)`
font-size: 14px;
user-select:none;
&:before {
  width: 1em;
  height: 1em;
  border: 1px solid #fff;
  margin: auto 10px auto 0;
}
`

const CommentInnerBox = styled.div`
position: relative;
column-gap: 50px;
display:flex;
align-items:end;
`

const SubmitBtn = styled.button`
  width:100%;
  padding: 10px;
  background : rgba(255,255,255,.3);
  transition: .2s;
  svg{
    color: #fff;
  }
  &:hover{
    background  : rgba(200,200,200,.3);
  }
`

const SubmitBox = styled.div`
  width: 50px;
  height: 50px;
  flex-shrink : 0;
  border-radius: 10px;
  overflow:hidden;
`

const CommentTextArea = styled.textarea<{row : number}>`
  flex: 1;
  resize :none;
  line-height: 24px;
  font-size : 14px;
  min-height: 150px;
  // height 계산법 line-height * row + padding(top/bottom)
  height: ${({ row }) => 24 * row }px;
  padding: 0 10px ;
  background: transparent;
  outline: 0;
  color :#fff;
  font-weight: 900;
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  font-family : 'Pretendard-Regular';
`

const CommentBox = styled.div`
padding:  40px 20px 20px;
`

const Author = styled.div`


`
export const AuthorInnerBox =styled.div`
  display: inline-flex;
  align-items:center;
  column-gap : 20px;
  background: #6B728E;
  padding: 6px 30px 6px 20px;
  border-radius : 30px;
`

export const AuthorImageBox = styled.div<{isWriter ?: boolean;}>`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink : 0;
  ${({isWriter}) => isWriter &&`
    order : 2;
  `}
`

const AuthorBox = styled.div`
  padding: 15px 30px 15px;
  background: rgba(128,128,128,0.3);
`

const FormContainer = styled.div`
  width:100%;
  border: 1px solid rgba(128,128,128,0.3);
  box-shadow : 10px 10px 10px rgba(0,0,0,.3);
  border-radius : 20px;
  overflow: hidden;
`

const Form = styled.form<{isReply ?: boolean; isWriter ?: boolean;}>`
  width:100%;
  margin-bottom: 80px;
  ${({isReply, isWriter}) => isReply &&`
    max-width: 850px;
    ${isWriter ? css`
    ` : css`
    margin : 0 0 0 auto;
    `}
    
  `}
`