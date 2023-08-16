import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Clipboard } from '@styled-icons/bootstrap/Clipboard';
import { ArrowEnterLeft } from '@styled-icons/fluentui-system-filled/ArrowEnterLeft';
import { useRecoilState } from 'recoil';
import { X } from '@styled-icons/bootstrap/X';
import { CleanBtn } from './SearchInputBox';
import { SearchBoardProps } from '@/src/types/board';
import { AccessTime } from '@styled-icons/material-rounded/AccessTime';
import useConvert from '@/src/hooks/useConvert';
import { searchModalState, searchRecent } from '@/src/atoms/atoms';

interface SearchListBoxProps {
  data: any;
  title: string;
  currentValue: string;
  isRecent?: boolean;
}

const SearchListBox = ({ data, title, currentValue, isRecent }: SearchListBoxProps) => {
  const [isOpenSearchModal, setIsOpenSearchModal] = useRecoilState(searchModalState);
  const [recentBoard, setRecentBoard] = useRecoilState(searchRecent);

  const { convertContent } = useConvert();

  const onClickLink = (board: SearchBoardProps) => () => {
    const isDuplicate = recentBoard.some(({ id }: any) => id === board.id);
    if (!isDuplicate) {
      if (recentBoard.length >= 3) {
        const copiedPrev = [...recentBoard];
        const filterRecent = copiedPrev.slice(0, -1);
        setRecentBoard([board, ...filterRecent]);
      } else {
        setRecentBoard((prev) => [board, ...prev]);
      }
    }
    setIsOpenSearchModal(false);
  };

  const handleDeleteRecent = (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setRecentBoard((prev) => prev.filter((board: any) => id !== board.id));
  };

  const highlightSearchTerm = (text: string) => {
    if (!currentValue) return text;
    const index = text.toLowerCase().indexOf(currentValue.toLowerCase());

    if (index !== -1) {
      const start = Math.max(0, index - 15);
      const end = Math.min(text.length, index + currentValue.length + 50);
      const highlightedText = text.substring(start, end);
      const displayedText = start > 0 ? `...${highlightedText}` : highlightedText;
      return displayedText.replace(new RegExp(currentValue, 'gi'), '<mark>$&</mark>');
    }

    return text;
  };

  return (
    <>
      {data.length > 0 && (
        <SearchList isRecent={isRecent}>
          <SearchListTitle>
            <span>{title}</span>
          </SearchListTitle>
          {data.map((board: any) => {
            const { id, boardTitle, contents, tags } = board;
            return (
              <SearchItem key={isRecent ? 'isRecent' + id : 'SeachItem' + id}>
                <SearchItemLink href={`/${id}`} onClick={onClickLink(board)} $isRecent={isRecent}>
                  <SearchItemIconBox>{isRecent ? <AccessTime /> : <Clipboard />}</SearchItemIconBox>
                  <SearchItemContents>
                    <p dangerouslySetInnerHTML={{ __html: highlightSearchTerm(boardTitle) }} />
                    <p dangerouslySetInnerHTML={{ __html: highlightSearchTerm(title === 'Tags' ? tags : convertContent(contents).replace(/(<([^>]+)>)/gi, '')) }} />
                  </SearchItemContents>
                  <SearchItemIconBox className="enterIconBox">
                    <ArrowEnterLeft />
                  </SearchItemIconBox>
                  {isRecent && (
                    <RecentDeleteBtnBox>
                      <CleanBtn onClick={handleDeleteRecent(id)}>
                        <X />
                      </CleanBtn>
                    </RecentDeleteBtnBox>
                  )}
                </SearchItemLink>
              </SearchItem>
            );
          })}
        </SearchList>
      )}
    </>
  );
};

export default SearchListBox;

const RecentDeleteBtnBox = styled.div`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const SearchListTitle = styled.div`
  color: ${({ theme }) => theme.color.success};
  font-size: 14px;
  padding: 10px 0;
`;

const SearchItemContents = styled.div`
  width: calc(100% - 60px);
  padding: 0 20px;
  p {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 26px;
  }
  mark {
    background: transparent;
    color: ${({ theme }) => theme.color.success};
    text-decoration: underline;
    transition: 0.2s;
  }
`;
const SearchItemIconBox = styled.div`
  flex-shrink: 0;
  width: 30px;
  padding: 3px;
  flex-shrink: 0;
  svg {
    width: 100%;
    color: #fff;
  }
`;

const SearchItemLink = styled(Link)<{ $isRecent?: boolean }>`
  position: relative;
  width: 100%;
  padding: 10px 10px 10px 20px;
  display: flex;
  align-items: center;
  transition: 0.2s;
  background: #232323;
  > ${SearchItemIconBox}.enterIconBox {
    opacity: 0;
    margin: auto 0 auto auto;
    transition: 0.2s;
  }
  &:hover {
    > ${SearchItemIconBox}.enterIconBox {
      opacity: 1;
    }
    background: ${({ theme }) => theme.color.success};
    mark {
      color: #fff;
      text-decoration: underline;
    }
  }
  ${({ $isRecent }) =>
    $isRecent &&
    `
    padding: 10px 40px 10px 20px;
  `}
`;

const SearchItem = styled.li`
  width: 100%;
  border-radius: 3px;
  overflow: hidden;

  & + & {
    margin-top: 6px;
  }
`;

const SearchList = styled.ul<{ isRecent?: boolean }>`
  padding: 10px 0;
  ${({ isRecent }) =>
    isRecent &&
    `
    border-bottom: 1px solid rgba(128,128,128,1);
  `}
`;
