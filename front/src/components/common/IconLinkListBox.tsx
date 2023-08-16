import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LinkTypes, iconLinks } from '@/src/utils/iconLinkList';
import IconButtonBox from './IconLinkBox';
import { usePathname } from 'next/navigation';

const IconLinkListBox = ({ popupPage }: { popupPage: boolean }) => {
  const [currentLinkRemoveList, setCurrentLinkRemoveList] = useState<LinkTypes[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const filterdCntPath = iconLinks.filter((x) => x.link !== pathname);
    setCurrentLinkRemoveList(filterdCntPath);
  }, [pathname]);

  return (
    <ListBox>
      {popupPage ||
        currentLinkRemoveList.map(({ link, title, icon, color }) => (
          <IconButtonBox key={link + title} link={link} title={title} color={color}>
            {icon}
          </IconButtonBox>
        ))}
    </ListBox>
  );
};

export default IconLinkListBox;

const ListBox = styled.div`
  position: absolute;
  left: 30px;
  top: 20px;
  z-index: 50;
  display: inline-flex;
  column-gap: 10px;
`;
