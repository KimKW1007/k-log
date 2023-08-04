import React, { useState } from 'react'
import styled, { keyframes, css } from 'styled-components';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import customApi from '@utils/customApi';
import { useRouter } from 'next/router';

const CommentItemArea = () => {
  const router= useRouter();
  const [currentBoardId, setCurrentBoardId] = useState(-1);
  const [replyIndex, setReplyIndex] = useState(-1);
  const {getApi} = customApi('/comment/getTargetBoardComment')


  return (
    <CommentItemBox>
      <CommentItem setReplyIndex={setReplyIndex}/>
      <CommentForm isReply isWriter/>
    </CommentItemBox>
  )
}

export default CommentItemArea

const CommentItemBox=  styled.div``

