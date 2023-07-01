import React from 'react';
import styled, { css } from 'styled-components';
import { LinkTypes } from '@utils/iconLinkList';
import { useRouter } from 'next/router';
import { ChildrenProps } from '@src/types/children';


interface IconButtonProps extends ChildrenProps, LinkTypes {}

const IconButtonBox = ({ children, title, link, color }: Omit<IconButtonProps, 'icon'>) => {
  const router = useRouter();

  return (
    <LinkBox color={color} title={title}>
      <button onClick={() => router.push(link)} title={title}>
        {children}
      </button>
    </LinkBox>
  );
};

export default IconButtonBox;

const LinkBox = styled.div<{ color: string; title: string }>`
  width: 46px;
  height: 46px;
  border-radius: 15px;
  overflow: hidden;
  background: ${({ color }) => color}ba;
  border: 1px solid ${({ color }) => color};
  transition: 0.3s;
  button {
    width: 100%;
    height: 100%;
    padding: 10px;
    background: transparent;
    svg {
      width: 100%;
      color: #fff;
      ${({ title }) =>
        title === '로그인' &&
        css`
          margin-left: -4px;
        `}
    }
  }
  &:hover {
    background: ${({ color }) => color};
  }
`;
