import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Image from 'next/image';
import defaultAuthorImage from '@/src/assets/images/500_94.jpg';
import { Author } from './CommentForm';
import { CommentMultiple, CommentOff } from '@styled-icons/fluentui-system-filled/';
import { OnlyAlignCenterFlex } from '@/src/components/common/CommonFlex';
import { Reply } from '@styled-icons/entypo/Reply';
import { User5 } from '@styled-icons/remix-fill/User5';
import { Lock2 } from '@styled-icons/remix-fill/Lock2';
import { LockOpen } from '@styled-icons/ionicons-solid/LockOpen';
import changeCreatedAt from '@/src/utils/changeCreatedAt';
import customApi from '@/src/utils/customApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_COMMENTS } from '@/src/utils/queryKeys';
import DeleteModal from '@/src/components/modal/DeleteModal';
import { useRecoilState } from 'recoil';
import { userInfomation } from '@/src/atoms/atoms';
import useCheckLogin from '@/src/hooks/useCheckLogin';

interface CommentItemProps {
  isReply?: boolean;
  boardWriterId: number;
  setReplyIndex: React.Dispatch<React.SetStateAction<number>>;
  comment?: any;
  boardId: string;
  commentWriterId: number;
}

const CommentItem = ({ boardWriterId, setReplyIndex, commentWriterId, isReply, comment, boardId }: CommentItemProps) => {
  const { id, authorImage, authorName, authorId, comment: commentText, createdAt, isSecret, replies } = comment;
  const [currentUser, setCurrentUser] = useRecoilState(userInfomation);
  const { checkLogin } = useCheckLogin();
  const isWriter = boardWriterId === Number(authorId);
  const checkAuthor = commentWriterId === currentUser?.id || boardWriterId === currentUser?.id || authorId === currentUser?.id || Boolean(currentUser?.isAdmin);
  const checkDeleteAuthor = boardWriterId === currentUser?.id || authorId === currentUser?.id || Boolean(currentUser?.isAdmin);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const queryClient = useQueryClient();
  const { deleteApi: deleteReplyCommentApi } = customApi(`/comment/deleteReply/${id}`);
  const { deleteApi: deleteCommentApi } = customApi(`/comment/deleteComment/${id}`);

  const { mutate } = useMutation(isReply ? deleteReplyCommentApi : deleteCommentApi, {
    onSuccess(data) {
      queryClient.invalidateQueries([GET_COMMENTS, boardId]);
    }
  });

  const secretComment = () => {
    if (checkAuthor) {
      return false;
    }
    return JSON.parse(isSecret.toLowerCase());
  };

  const handleDeleteComment = () => {
    if (!checkDeleteAuthor) {
      alert('댓글 삭제는 작성자 및 관리자만 가능합니다.');
      return;
    }
    if (!isReply && replies.length > 0) {
      alert('대댓글이 작성 된 경우 삭제가 불가능 합니다.');
      return;
    }
    setIsOpenDeleteModal(true);
  };

  const handleReplyComment = () => {
    checkLogin(() => {
      setReplyIndex(id);
    });
  };

  return (
    <CommentItemBox isWriter={isWriter}>
      <Icon $isWriter={isWriter} />
      <AuthorImageBox isWriter={isWriter}>
        <Image src={authorImage || defaultAuthorImage.src} alt={'유저 이미지'} width={50} height={50} />
      </AuthorImageBox>
      <CommentBox>
        <CommentInnerBox isWriter={isWriter}>
          <AuthorArea isWriter={isWriter}>
            <AuthorBox>
              <User5 />
              <span>{authorName}</span>
            </AuthorBox>
          </AuthorArea>
          <CommentTextBox>
            {secretComment() && (
              <SecretComment>
                <Lock2 />
                <span>비밀 댓글 입니다.</span>
              </SecretComment>
            )}
            {secretComment() || commentText.split('\n').map((ele: string, index: number) => <p key={authorName + ele + 'salt' + index}>{ele}</p>)}
          </CommentTextBox>
        </CommentInnerBox>
        <AccessoryBox>
          <DateBox>{changeCreatedAt(createdAt)}</DateBox>
          <DeleteBtn onClick={handleDeleteComment}>
            <span />
            <CommentOff />
          </DeleteBtn>
          {isReply || (
            <ReplyBtn onClick={handleReplyComment}>
              <span />
              <CommentMultiple />
            </ReplyBtn>
          )}
          {checkAuthor && JSON.parse(isSecret.toLowerCase()) && (
            <SecretIconBtn disabled onClick={(e) => e.preventDefault()}>
              <span />
              <LockOpen />
            </SecretIconBtn>
          )}
          {isOpenDeleteModal && <DeleteModal mutate={() => mutate({})} onClose={() => setIsOpenDeleteModal(false)} />}
        </AccessoryBox>
      </CommentBox>
    </CommentItemBox>
  );
};

export default CommentItem;

const BtnAni = keyframes`
  0%{
    opacity : 0;
    top: 6px;
  }
  
  100%{
    opacity : 1;
    top: 0px;
  }
`;

const AuthorImageBox = styled.div<{ isWriter?: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  ${({ isWriter }) =>
    isWriter &&
    `
    order : 2;
  `}
`;

const SecretComment = styled(OnlyAlignCenterFlex)`
  height: 30px;
  svg {
    width: 20px;
    color: #fff;
    margin: -3px 6px 0 0;
  }
`;

const DefaultBtn = styled.button`
  position: relative;
  width: 20px;
  height: 20px;
  padding: 3px;
  display: flex;
  background: transparent;
  svg {
    width: 100%;
    margin: auto;
    color: #fff;
  }
  span {
    overflow: visible;
    position: absolute;
    opacity: 0;
    left: 0;
    top: 6px;
    width: 100%;
    height: 100%;
    display: none;
    &:after,
    &:before {
      content: '';
      position: absolute;
      left: 50%;
      background: #4682a9;
    }
    &:after {
      top: -36px;
      padding: 5px 7px;
      transform: translateX(-50%);
      width: 60px;
      color: #232323;
      border-radius: 4px;
      color: #fff;
    }
    &:before {
      top: -12px;
      transform: translateX(-50%) rotate(-45deg);
      transform-origin: 0 40%;
      width: 10px;
      height: 10px;
    }
  }
  &:hover {
    span {
      display: block;
      animation: ${BtnAni} 0.4s forwards;
    }
  }
`;

const ReplyBtn = styled(DefaultBtn)`
  span {
    &:after {
      content: '답글쓰기';
    }
  }
`;
const DeleteBtn = styled(DefaultBtn)`
  span {
    &:after {
      content: '삭제';
      width: 30px;
    }
  }
`;
const SecretIconBtn = styled(DefaultBtn)`
  span {
    &:after {
      content: '비밀댓글';
    }
  }
`;
const DateBox = styled.div`
  font-size: 13px;
`;

const AccessoryBox = styled(OnlyAlignCenterFlex)`
  column-gap: 10px;
  padding: 10px 10px 10px 30px;
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 0 0 10px 10px;
  background: rgba(128, 128, 128, 0.3);
`;

const CommentInnerBox = styled.div<{ isWriter?: boolean }>`
  padding: 20px 24px;
  background: #50577a;

  ${({ isWriter }) =>
    isWriter &&
    `
    background: #C38154;
  `}
`;

const CommentTextBox = styled.div`
  min-width: 260px;
  min-height: 30px;
  padding: 0 10px;
  p {
    overflow-wrap: break-word;
    word-break: keep-all;
    white-space: pre-wrap;
    color: #fff;
    line-height: 30px;
  }
`;

const AuthorArea = styled(OnlyAlignCenterFlex)<{ isWriter?: boolean }>`
  margin-bottom: 20px;
  ${({ isWriter }) =>
    isWriter &&
    `
  justify-content: space-between;
`}
`;

const AuthorBox = styled(Author)`
  background: #3c4048;
`;

const CommentBox = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
`;

const CommentItemBox = styled.div<{ isWriter?: boolean }>`
  width: 100%;
  display: flex;
  position: relative;
  column-gap: 20px;
  margin-bottom: 30px;
  ${({ isWriter }) =>
    isWriter &&
    `
    justify-content:end;
  `}
`;

const Icon = styled(Reply)<{ $isWriter?: boolean }>`
  position: absolute;
  width: 30px;
  top: 10px;
  ${({ $isWriter }) =>
    $isWriter
      ? css`
          transform: scaleX(1) rotate(-37deg);
          right: 58px;
          color: #c38154;
        `
      : css`
          transform: scaleX(-1) rotate(-37deg);
          left: 58px;
          color: #50577a;
        `}
`;
