import React from 'react'
import styled, { keyframes, css } from 'styled-components';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const Comment = ({id} : {id :string}) => {
  return (
    <CommentArea>
      <CommentForm id={id} />
      <CommentList id={id} />
    </CommentArea>
  )
}

export default Comment


const CommentArea = styled.div`
  margin-top : 100px;
`