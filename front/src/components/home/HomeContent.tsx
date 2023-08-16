import React, { useEffect } from 'react';
import styled from 'styled-components';
import HomeNewPoster from './HomeNewPoster';
import HomeSidebar from './HomeSidebar';
import { useRecoilState } from 'recoil';
import { isRemoveSidebar } from '@/src/atoms/atoms';
import { usePathname } from 'next/navigation';
import useIsMount from '@/src/hooks/useIsMount';


const HomeContent = () => {
  const pathname = usePathname();
  const [isRemove, setIsRemove] = useRecoilState(isRemoveSidebar);
  const { isMount } = useIsMount();

  const checkNowWindowWidth = () => {
    if (window.innerWidth <= 1600) {
      setIsRemove(true);
    } else {
      setIsRemove(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      checkNowWindowWidth();
    };

    if (pathname === '/') {
      window.addEventListener('resize', handleResize);
      checkNowWindowWidth(); // 초기 렌더링 시에도 체크를 수행
    }

    return () => {
      if (pathname === '/') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [pathname]);

  return (
    <ContentsWrap>
      <ContentsContainer>
        <HomeNewPoster />
        {isMount && (isRemove || <HomeSidebar />)}
      </ContentsContainer>
    </ContentsWrap>
  );
};

export default HomeContent;

const ContentsWrap = styled.div`
  position: relative;
  min-height: 1000px;
  width: 100%;
  transform-style: preserve-3d;
  z-index: 1;
  padding: 100px 30px;
  @media (max-width: 937px) {
    padding: 50px 0 100px;
  }
`;

const ContentsContainer = styled.div`
  position: relative;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  padding: 50px 30px;
  border: 1px solid #444;
  display: flex;
  background: #2a2a2a;
  column-gap: 40px;
  @media (max-width: 1600px) {
    width: 100%;
  }
`;
