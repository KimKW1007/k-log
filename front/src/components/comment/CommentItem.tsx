import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import Image from 'next/image';
import defaultAuthorImage from '@assets/images/500_94.jpg';
import { AuthorImageBox, AuthorInnerBox } from './CommentForm';
import { CommentMultiple, CommentOff } from '@styled-icons/fluentui-system-filled/';
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import { Reply } from '@styled-icons/entypo/Reply';

interface CommentItemProps {
  isWriter ?: boolean;
  setReplyIndex: React.Dispatch<React.SetStateAction<number>>;
  comment: any;
}

const CommentItem = ({isWriter, setReplyIndex, comment} : CommentItemProps) => {
  return (
    <CommentItemBox>
      <Icon isWriter={isWriter} />
      <AuthorImageBox isWriter={isWriter}>
        <Image src={defaultAuthorImage.src} alt={'유저 이미지'} width={30} height={30} />
      </AuthorImageBox>
      <CommentBox>
        <CommentInnerBox >
          <AuthorArea isWriter={isWriter}>
            <AuthorBox >
              <span>From . 관리자</span>
            </AuthorBox>
          </AuthorArea>
          <CommentTextBox>
            <p>
              누가 뭐래도난누가 뭐래도난누가 뭐래도누가 뭐래도난난누가 뭐래도난누가 뭐래도난누가뭐래도난누가 뭐래도난누가뭐래도난누가 뭐래도난누가뭐래도난누가 뭐래도난누가뭐래도난누가 뭐래도난누가뭐래도난누가 뭐래도난누가뭐래도난누가
              뭐래도난누가뭐래도난누가 뭐래도난누가뭐래도난누가 뭐래도난누가뭐래도난누가 뭐래도난누가뭐래도난누가 뭐래도난누가 뭐래도난누가
            </p>
          </CommentTextBox>
        </CommentInnerBox>
        <AccessoryBox>
          <DateBox>2023.08.04 16:42</DateBox>
          <DeleteBtn>
            <span />
            <CommentOff />
          </DeleteBtn>
          <ReplyBtn onClick={()=> setReplyIndex(comment.id)} >
            <span />
            <CommentMultiple />
          </ReplyBtn>
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
    display:none;
    &:after,
    &:before {
      content: '';
      position: absolute;
      left: 50%;
      background: #fff;
    }
    &:after {
      top: -36px;
      padding: 5px 7px;
      transform: translateX(-50%);
      width: 30px;
      color: #232323;
      border-radius: 4px;
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
      display:block;
      animation: ${BtnAni} 0.4s forwards;
    }
  }
`;

const ReplyBtn = styled(DefaultBtn)`
  span {
    &:after {
      content: '답글쓰기';
      width: 60px;
    }
  }
`;
const DeleteBtn = styled(DefaultBtn)`
  span {
    &:after {
      content: '삭제';
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

const CommentInnerBox = styled.div`
  padding: 20px 30px;
  background: #50577a;
`;

const CommentTextBox = styled.div`
  p {
    overflow-wrap: break-word;
    word-break: keep-all;
    white-space: pre-wrap;
    color: #fff;
    line-height: 30px;
  }
`;

const AuthorArea = styled(OnlyAlignCenterFlex)<{isWriter ?: boolean;}>`
margin-bottom: 20px;
${({isWriter}) => isWriter&&`
  justify-content: space-between;
`}
`

const AuthorBox = styled(AuthorInnerBox)`
  padding: 8px 20px;
  background: #3c4048;
`;

const CommentBox = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
`;

const CommentItemBox = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  column-gap: 20px;
`;

const Icon = styled(Reply)<{isWriter ?: boolean;}>`
  position: absolute;
  width: 30px;
  color: #50577a;
  top: 0;
  ${({isWriter}) => isWriter ? css`
    transform: scaleX(1) rotate(-45deg);
    right: 39px;

  ` : css`
    transform: scaleX(-1) rotate(-45deg);
    left: 39px;
  `}
`;
