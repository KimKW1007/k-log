import React from 'react'
import styled, { keyframes, css } from 'styled-components';
import CommentItemArea from './CommentItemArea';

const CommentList = ({id} : {id :string}) => {
  return (
    <CommentListBox>
      <CommentItemArea id={id} />
    </CommentListBox>
  )
}

export default CommentList

const CommentListBox = styled.div`
  width:100%;
`