import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled, {keyframes} from 'styled-components';
import logo_white from '@images/white.svg';
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import { ChevronDown, ChevronUp } from '@styled-icons/entypo';
import { isRemoveSidebar, userInfomation } from '@atoms/atoms';
import { useRecoilState } from 'recoil';
import LoginSignUpBox from './LoginSignUpBox';
import HeaderUserMenu from './HeaderUserMenu';
import CategoryBox from '@components/category/CategoryBox';
import { useRouter } from 'next/router';
import useIsMount from 'src/hooks/useIsMount';
import SideMenu from './SideMenu';

export const Header = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(userInfomation);
  const [isReactive, setIsReactive] = useRecoilState(isRemoveSidebar);
  const [notShowCategory , setNotShowCategory] = useState(false);
  const { isMount } = useIsMount();

  useEffect(()=>{
    if(router.pathname !== '/'){
      setIsReactive(true);
      setNotShowCategory(true)
    }else{
      setNotShowCategory(false)
    }
  },[router])

  return (
    <HeaderBox >
      <HeaderInnerBox>
        <LogoAndCategoryBox>
          {notShowCategory && <CategoryBox></CategoryBox> }
          <LogoBox isReactive={notShowCategory}>
            <Link href={'/'} title="홈">
              <Image src={logo_white} alt={'로고'}></Image>
            </Link>
          </LogoBox>
        </LogoAndCategoryBox>
        <KlogTextLogo href={'/'} title="홈">
          <h2>K : Log</h2>
        </KlogTextLogo>
        {isMount && (
          <>
            {isReactive || <BtnBox>{isMount && userInfo ? <HeaderUserMenu isInSideMenu={false} /> : <LoginSignUpBox />}</BtnBox>}
            {isReactive && <SideMenu />}
          </>
        )}
      </HeaderInnerBox>
    </HeaderBox>
  );
};

const KlogTextLogo = styled(Link)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  h2{
    font-size: 34px;
    transition: .2s;
  }
  &:hover{
    h2{
      text-shadow: #fc0 1px 0 10px;
    }
  }
`;

const HeaderBox = styled.header`
  position: relative;
  z-index: 14;
  width: 100%;
  height: ${({ theme }) => theme.rem.p70};
  background: #111111;
  color: #fff;
  
`;
const HeaderInnerBox = styled(OnlyAlignCenterFlex)`
  position: relative;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  height: 100%;
  padding: 0 ${({ theme }) => theme.rem.p30};
  justify-content: space-between;
`;
const LogoBox = styled(OnlyAlignCenterFlex)<{isReactive : boolean;}>`
  width: ${({ theme }) => theme.rem.p50};
  height: 100%;
  ${({isReactive}) => isReactive &&`
    margin-left: 180px;
  `}
  img {
    max-width: 100%;
  }
  @media (max-width:700px){
    margin-left: 0;
  }
`;

const BtnBox = styled(OnlyAlignCenterFlex)``;

const LogoAndCategoryBox = styled.div`
  display: inline-flex;
  height: 100%;
  align-items: center;
`;
