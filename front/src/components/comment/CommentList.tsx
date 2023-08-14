import React, { useState } from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import customApi from '@utils/customApi';
import { useQuery } from '@tanstack/react-query';
import { GET_COMMENTS } from '@utils/queryKeys';

const CommentList = ({ id }: { id: string }) => {
  const [replyIndex, setReplyIndex] = useState(-1);
  const { getApi } = customApi(`/comment/getTargetBoardComment/${id}`);
  const { data } = useQuery([GET_COMMENTS, id], () => getApi());
  const { comments, writerId } = data ?? {};
  return (
    <CommentListBox>
      {comments?.length > 0 || (
        <EmptyCommentBox>
          <p>아직 댓글이 없어요!</p>
          <p>첫 댓글을 작성해주세요!</p>
        </EmptyCommentBox>
      )}
      {comments?.length > 0 &&
        comments.map((comment: any, index: number) => (
          <CommentItemBox key={'comment' + comment.id}>
            <CommentItem boardWriterId={writerId} commentWriterId={comment.authorId} setReplyIndex={setReplyIndex} comment={comment} boardId={id} />
            {replyIndex === comment.id && <CommentForm isReply id={id} commentId={comment.id} setReplyIndex={setReplyIndex} />}
            {comment.replies.length > 0 && comment.replies.map((reply: any) => <CommentItem key={'reply' + reply.id} isReply boardWriterId={writerId} commentWriterId={comment.authorId} setReplyIndex={setReplyIndex} comment={reply} boardId={id} />)}
          </CommentItemBox>
        ))}
    </CommentListBox>
  );
};

export default CommentList;

const CommentItemBox = styled.div`
  padding: 50px 0;
  border-bottom: 4px dotted #a5a5a5a1;
`;

const CommentListBox = styled.div`
  width: 100%;
`;
const EmptyCommentBox = styled.div`
  width: 100%;
  text-align: center;
  padding: 100px 0 300px;
`;
