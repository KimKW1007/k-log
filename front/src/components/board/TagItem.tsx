import { OnlyAlignCenterFlex } from '@/src/components/common/CommonFlex';
import { X } from '@styled-icons/bootstrap';
import React, { useState } from 'react';
import styled from 'styled-components';

interface TagItemProps {
  tag: string;
  handleRemoveTag: () => void;
}

const TagItem = ({ tag, handleRemoveTag }: TagItemProps) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <TagItemBox isHover={isHover}>
      {tag.replace('#', '')}
      <DeleteTagBtn type="button" onClick={handleRemoveTag} onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)}>
        <X />
      </DeleteTagBtn>
    </TagItemBox>
  );
};

export default TagItem;

const TagItemBox = styled(OnlyAlignCenterFlex)<{ isHover: boolean }>`
  padding: 8px 0 8px 10px;
  font-size: 14px;
  background: ${({ theme }) => theme.color.success};
  border-radius: 5px;
  transition: 0.3s;
  & + & {
    margin-left: 10px;
  }
  user-select: none;
  ${({ isHover, theme }) =>
    isHover &&
    `
    background :${theme.color.err};
  `}
`;
const DeleteTagBtn = styled.button`
  margin: 0 10px;
  width: 20px;
  height: 20px;
  background: transparent;
  svg {
    width: 100%;
    color: #fff;
  }
`;
