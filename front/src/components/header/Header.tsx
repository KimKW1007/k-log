import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo_black from '@images/black.svg';
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import { ChevronDown, ChevronUp } from '@styled-icons/entypo';
import { userInfomation } from '@atoms/atoms';
import { useRecoilState } from 'recoil';
import LoginSignUpBox from './LoginSignUpBox';
import UserMiniProfile from './UserMiniProfile';
import CategoryBox from '@components/common/CategoryBox';

export const Header = () => {
  const [isCategoryOn, setIsCategoryOn] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userInfomation);
  const [isMount, setIsMount] = useState<boolean>(false);
  useEffect(() => {
    setIsMount(true);
  }, []);

  return (
    <HeaderBox>
      <HeaderInnerBox>
        <LogoAndCategoryBox>
          <CategoryBox setIsCategoryOn={setIsCategoryOn} isCategoryOn={isCategoryOn}></CategoryBox>
          <LogoBox>
            <Link href={'/'} title="K - Blog">
              <Image src={logo_black} alt={'로고'}></Image>
            </Link>
          </LogoBox>
        </LogoAndCategoryBox>
        <KlogText>K - Log</KlogText>
        <BtnBox>{isMount && userInfo ? <UserMiniProfile /> : <LoginSignUpBox />}</BtnBox>
      </HeaderInnerBox>
    </HeaderBox>
  );
};

const KlogText = styled.h2`
  position: absolute;
  left: 50%;
  top: 50%;
  transform : translate(-50%,-50%);
  pointer-events: none;
`

const HeaderBox = styled.header`
  position: relative;
  z-index: 16;
  width: 100%;
  height: ${({ theme }) => theme.rem.p70};
  padding: 0 ${({ theme }) => theme.rem.p30};
  box-shadow: 0 0 20px #eee;
`;
const HeaderInnerBox = styled(OnlyAlignCenterFlex)`
  position :relative;
  width: 100%;
  height: 100%;
  padding: 0 ${({ theme }) => theme.rem.p30};
  justify-content: space-between;
`;
const LogoBox = styled(OnlyAlignCenterFlex)`
  width: ${({ theme }) => theme.rem.p50};
  height: 100%;
  margin-left: 180px;
  img {
    max-width: 100%;
  }
`;

const BtnBox = styled(OnlyAlignCenterFlex)``;

const LogoAndCategoryBox = styled.div`
  display: inline-flex;
  height: 100%;
  align-items: center;
`;

const CategoryBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 8rem;
  height: ${({ theme }) => theme.rem.p40};
  margin-right: ${({ theme }) => theme.rem.p30};
  border-bottom: 1px solid #000;
  padding-left: ${({ theme }) => theme.rem.p10};
  text-align: left;
  font-size: 14px;
  font-family: 'Pretendard-Regular';
  font-weight: bold;
  background: rgba(0, 0, 0, 0);
`;

const DownDirection = styled(ChevronDown)`
  width: ${({ theme }) => theme.rem.p20};
`;
const UpDirection = styled(ChevronUp)`
  width: ${({ theme }) => theme.rem.p20};
`;
