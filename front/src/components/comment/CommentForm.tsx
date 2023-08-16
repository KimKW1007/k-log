import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Comment } from '@styled-icons/fluentui-system-filled/Comment';
import { useForm } from 'react-hook-form';
import { CheckBoxInput, Label } from '@/src/components/common/CheckBoxInputs';
import customApi from '@/src/utils/customApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { userInfomation } from '@/src/atoms/atoms';
import { User5 } from '@styled-icons/remix-fill/User5';
import { X } from '@styled-icons/bootstrap';
import { GET_COMMENTS } from '@/src/utils/queryKeys';
import TextareaAutosize from 'react-textarea-autosize';
import useIsMount from '@/src/hooks/useIsMount';
import useCheckLogin from '@/src/hooks/useCheckLogin';

interface CommentFormProps {
  isReply?: boolean;
  id: string;
  commentId?: number;
  setReplyIndex?: React.Dispatch<React.SetStateAction<number>>;
}

const CommentForm = ({ isReply, id, commentId, setReplyIndex }: CommentFormProps) => {
  const queryClient = useQueryClient();
  const [currentUser, setCurrentUser] = useRecoilState(userInfomation);
  const [placeholderText, setPlaceholderText] = useState('로그인 후 이용 가능합니다.');
  const { checkLogin } = useCheckLogin();
  const { isMount } = useIsMount();

  const { postApi: sendMailPostApi } = customApi(`/comment/sendMail/${id}`);
  const { postApi: commentPostApi } = customApi(`/comment/create/${id}`);
  const { postApi: replyPostApi } = customApi(`/comment/createReply/${commentId}`);
  const { mutate: sendMailMutate } = useMutation(sendMailPostApi);
  const { mutate } = useMutation(isReply ? replyPostApi : commentPostApi, {
    onSuccess(data) {
      queryClient.invalidateQueries([GET_COMMENTS, id]);
      setValue('comment', '');
      setReplyIndex!(-1);
    }
  });

  const { register, handleSubmit, setValue } = useForm({ mode: 'onSubmit' });

  const onSubmit = ({ comment, isSecret }: any) => {
    checkLogin(() => {
      if (comment?.trim() === '' || !comment) {
        alert('댓글을 입력해주세요');
        setValue('comment', '');
      } else {
        mutate({ comment, isSecret: `${isSecret}` });
        sendMailMutate({ comment, isSecret: `${isSecret}` });
      }
    });
  };

  useEffect(() => {
    if (currentUser?.id) {
      setPlaceholderText(`여러분의 댓글은 저에게 큰 힘이 됩니다.\n구독과 좋아요..아 이게아니지..\n대댓글이 작성 될 경우 삭제가 불가능 합니다.`);
    } else {
      setPlaceholderText('로그인 후 이용 가능합니다.');
    }
  }, [isMount]);
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <Form isReply={isReply} onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <AuthorBox>
          <Author>
            <User5 />
            <span>{isMount && currentUser ? currentUser.userName : '게스트'}</span>
          </Author>
          {isReply && (
            <CancelBtn type="button" onClick={() => setReplyIndex!(-1)}>
              <X />
            </CancelBtn>
          )}
        </AuthorBox>
        <CommentBox>
          <CommentInnerBox>
            <CommentTextArea {...register('comment')} onChange={handleTextChange} placeholder={placeholderText} disabled={isMount && !Boolean(currentUser)}></CommentTextArea>
            <SubmitBox>
              <SubmitBtn>
                <Comment title={'댓글 달기'} />
              </SubmitBtn>
            </SubmitBox>
          </CommentInnerBox>
          <CheckSecretInputBox>
            <CheckSecretInput {...register('isSecret')} className="blind" type="checkbox" id={`secretInput${commentId ?? 0}`} />
            <CheckSecretLabel htmlFor={`secretInput${commentId ?? 0}`}>비밀글 작성</CheckSecretLabel>
          </CheckSecretInputBox>
        </CommentBox>
      </FormContainer>
    </Form>
  );
};

export default CommentForm;

const CancelBtn = styled.button`
  width: 30px;
  height: 30px;
  background: transparent;
  border-radius: 50%;
  transition: 0.2s;
  svg {
    width: 100%;
    color: #fff;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const CheckSecretInputBox = styled.div`
  margin: 10px 0 0 10px;
`;

export const CheckSecretInput = styled(CheckBoxInput)`
  &:checked + label {
    &::before {
      background-color: ${({ theme }) => theme.color.success};
    }
  }
`;

export const CheckSecretLabel = styled(Label)`
  font-size: 14px;
  user-select: none;
  &:before {
    width: 1em;
    height: 1em;
    border: 1px solid #fff;
    margin: auto 10px auto 0;
  }
`;

const CommentInnerBox = styled.div`
  position: relative;
  column-gap: 50px;
  display: flex;
  align-items: end;
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.3);
  transition: 0.2s;
  svg {
    color: #fff;
  }
  &:hover {
    background: rgba(200, 200, 200, 0.3);
  }
`;

const SubmitBox = styled.div`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 10px;
  overflow: hidden;
`;

const CommentTextArea = styled(TextareaAutosize)`
  flex: 1;
  resize: none;
  line-height: 24px;
  font-size: 14px;
  min-height: 150px;
  padding: 0 10px 10px;
  background: transparent;
  outline: 0;
  color: #fff;
  font-weight: 900;
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  font-family: 'Pretendard-Regular';
`;

const CommentBox = styled.div`
  padding: 40px 20px 20px;
  background: inherit;
`;

export const Author = styled.div`
  display: inline-flex;
  align-items: center;
  background: #6b728e;
  padding: 8px 24px 8px 20px;
  border-radius: 30px;
  column-gap: 5px;
  svg {
    width: 18px;
    margin-top: -2px;
  }
`;
export const AuthorInnerBox = styled.div`
  display: inline-flex;
`;

const AuthorBox = styled.div`
  padding: 15px 30px 15px;
  background: rgba(128, 128, 128, 0.3);
  display: flex;
  justify-content: space-between;
`;

const FormContainer = styled.div`
  width: 100%;
`;

const Form = styled.form<{ isReply?: boolean }>`
  width: 100%;
  border: 1px solid rgba(128, 128, 128, 0.3);
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  overflow: hidden;
  background: #23262d;
  ${({ isReply }) =>
    isReply &&
    `
    max-width: 850px;
    margin : 0 auto 40px;
  `}
`;
