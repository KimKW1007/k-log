import React, { useState } from 'react'
import styled, { keyframes, css } from 'styled-components';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import customApi from '@utils/customApi';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

const CommentItemArea = ({id} : {id :string}) => {
  const router= useRouter();
  const [currentBoardId, setCurrentBoardId] = useState(-1);
  const [replyIndex, setReplyIndex] = useState(-1);
  const {getApi} = customApi(`/comment/getTargetBoardComment/${id}`)
  const {data} = useQuery(["GET_COMMENTS", id], ()=>getApi())
  console.log("{data}",{data})
  return (
    <>
      {data && data.map((comment: any, index : number) => (
      <CommentItemBox>
        <CommentItem setReplyIndex={setReplyIndex} comment={comment}/>
        <CommentForm isReply isWriter id={id}/>
      </CommentItemBox>
      ))
    }
    </>
  )
}

export default CommentItemArea

const CommentItemBox=  styled.div``

