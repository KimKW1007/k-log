import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ArrowBack, ArrowForward } from '@styled-icons/ionicons-solid';
import Link from 'next/link';
import defaultImage from '@/src/assets/images/defaultImage.png';

interface NextPrevBoardBoxProps {
  [key: string]: any;
}

const NextPrevBoardBox = ({ title, id, thumbnail, type }: NextPrevBoardBoxProps) => {
  return (
    <AnotherBoardLinkBox>
      {id && (
        <AnotherBoardLink title={title} href={`/${id}`} $isPrev={type === 'prev'}>
          <AnotherBoardBg thumbnail={thumbnail ? thumbnail : defaultImage.src} />
          <AnotherBoardBox>
            {type === 'prev' && <ArrowBack />}
            <AnotherBoardTitleBox isNext={type === 'next'}>
              <span>{type === 'prev' ? '이전 포스트' : '다음 포스트'}</span>
              <div>{title}</div>
            </AnotherBoardTitleBox>
            {type === 'next' && <ArrowForward />}
          </AnotherBoardBox>
        </AnotherBoardLink>
      )}
    </AnotherBoardLinkBox>
  );
};

export default NextPrevBoardBox;

const movePrevArrow = keyframes`
  50%{
    transform : translateX(-5px);
  }
`;
const moveNextArrow = keyframes`
  50%{
    transform : translateX(5px);
  }
`;

const AnotherBoardLinkBox = styled.div`
  @media (max-width: 900px) {
    & + & {
      display: flex;
      justify-content: end;
    }
  }
  @media (max-width: 550px) {
    & + & {
      display: block;
    }
  }
`;

const AnotherBoardBg = styled.div<{ thumbnail: string }>`
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7) 100%, rgba(0, 0, 0, 0.7) 100%), url(${({ thumbnail }) => thumbnail}) no-repeat center center/80% auto;
  transform: scale(1.05);
  filter: blur(5px);
  transition: 0.6s;
  width: 100%;
  height: 100%;
`;
const AnotherBoardBox = styled.div`
  position: relative;
  display: flex;
  z-index: 2;
  width: 100%;
  height: 100%;
  padding: 20px 15px;
  overflow: hidden;
  > svg {
    width: 30px;
    flex-shrink: 0;
  }
`;
const AnotherBoardTitleBox = styled.div<{ isNext: boolean }>`
  overflow: hidden;
  flex: 1;
  > span {
    display: inline-block;
    margin-bottom: 6px;
    font-size: 14px;
    padding: 0 20px;
  }
  > div {
    font-size: 18px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    word-break: keep-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    padding: 0 20px;
  }
  ${({ isNext }) =>
    isNext &&
    `
    text-align:right;
   
  `}
`;
const AnotherBoardLink = styled(Link)<{ $isPrev: boolean }>`
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.color.lightGrey};
  border-radius: 10px;
  display: block;
  width: 400px;
  height: 100px;
  &:hover {
    ${AnotherBoardBg} {
      transform: scale(1.2);
    }
    ${AnotherBoardBox} {
      > svg {
        ${({ $isPrev }) =>
          $isPrev
            ? css`
                animation: ${movePrevArrow} 1s infinite;
              `
            : css`
                animation: ${moveNextArrow} 1s infinite;
              `}
      }
    }
  }
  @media (max-width: 550px) {
    width: 100%;
  }
`;
