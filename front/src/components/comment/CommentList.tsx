import React from 'react'
import styled, { keyframes, css } from 'styled-components';
import CommentItemArea from './CommentItemArea';

const CommentList = () => {
  return (
    <CommentListBox>
      <CommentItemArea />
    </CommentListBox>
  )
}

export default CommentList

const CommentListBox = styled.div`
  width:100%;
`