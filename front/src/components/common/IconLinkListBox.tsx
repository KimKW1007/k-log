import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LinkTypes, iconLinks } from '@utils/iconLinkList';
import IconButtonBox from './IconLinkBox';
import { useRouter } from 'next/router';
const IconLinkListBox = () => {
  const [currentLinkRemoveList, setCurrentLinkRemoveList] = useState<LinkTypes[]>([]);
  const router = useRouter();

  useEffect(() => {
    const filterdCntPath = iconLinks.filter((x) => x.link !== router.pathname);
    setCurrentLinkRemoveList(filterdCntPath);
  }, [router]);

  return (
    <ListBox>
      {router.pathname.includes('/identity/find') ||
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
