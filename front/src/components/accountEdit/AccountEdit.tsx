import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import AccountEditInputsBox from './AccountEditInputsBox';
import { accountEditTabList, accountEditMobTabList, bannerEditTabList } from '@/src/utils/accountEditTabList';
import { AllCenterFlex, OnlyAlignCenterFlex } from '@/src/components/common/CommonFlex';
import { useRecoilState } from 'recoil';
import { userInfomation } from '@/src/atoms/atoms';

interface AccountEditProps {
  isForward: boolean;
  isDisappear: boolean;
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}

const AccountEdit = ({ isForward, isDisappear, currentTab, setCurrentTab }: AccountEditProps) => {
  const onClickTab = (title: string) => () => {
    setCurrentTab(title);
  };
  const [currentUser, setCurrentUser] = useRecoilState(userInfomation);

  const [currentBannerTitle, setCurrentBannerTitle] = useState('메인배너');
  const settingBanner = accountEditTabList.at(-1);

  return (
    <>
      {isDisappear || (
        <TabBox>
          {accountEditTabList.slice(0, accountEditTabList.length - 1).map((title, idx) => (
            <Tab onClick={onClickTab(title)} key={idx + 'salt' + title} isCurrent={title === currentTab} isForward={isForward}>
              {title}
            </Tab>
          ))}
          {currentUser?.isAdmin && settingBanner && (
            <Tab onClick={onClickTab(settingBanner)} isCurrent={settingBanner === currentTab} isForward={isForward}>
              {settingBanner}
            </Tab>
          )}
        </TabBox>
      )}
      <EditAreaBox>
        <EditTitleBox>
          <h2>{currentTab}</h2>
        </EditTitleBox>
        <EditBox>
          {isDisappear ||
            (currentTab === '배너설정' && (
              <BannerTabBox>
                {bannerEditTabList.map((title, idx) => (
                  <BannerDetailTab onClick={() => setCurrentBannerTitle(title)} key={idx + 'bannerEditTabList' + title} isCurrent={title === currentBannerTitle}>
                    {title}
                  </BannerDetailTab>
                ))}
              </BannerTabBox>
            ))}
          {isDisappear && (
            <MobTabBox>
              {accountEditMobTabList.map((title, idx) => (
                <MobTap onClick={onClickTab(title)} key={idx + 'accountEditMobTabList' + title} isCurrent={title === currentTab}>
                  {title}
                </MobTap>
              ))}
            </MobTabBox>
          )}
          <EditInnerBox>
            <AccountEditInputsBox currentTab={currentTab} currentBannerTitle={currentBannerTitle}></AccountEditInputsBox>
          </EditInnerBox>
        </EditBox>
      </EditAreaBox>
    </>
  );
};

export default AccountEdit;

const MobTap = styled.button<{ isCurrent: boolean }>`
  border-bottom: 2px solid #999999a1;
  color: #999999a1;
  margin: 0 10px;
  padding: 10px 30px;
  background: transparent;
  font-size: 17px;
  font-weight: 700;
  transition: 0.2s;

  ${({ isCurrent }) =>
    isCurrent
      ? css`
          border-bottom: 2px solid #232323;
          color: #232323;
        `
      : css`
          &:hover {
            border-bottom: 2px solid #767676;
            color: #767676;
          }
        `}
  @media(max-width: 660px) {
    font-size: 15px;
  }
`;

const MobTabBox = styled(AllCenterFlex)`
  display: none;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 30px;
  row-gap: 10px;
  @media (max-width: 980px) {
    display: flex;
  }
`;

const Tab = styled.button<{ isCurrent: boolean; isForward: boolean }>`
  position: relative;
  font-size: 16px;
  padding: 50px 25px 50px 35px;
  font-weight: 900;
  border-radius: 0 20px 20px 0;
  color: #bbb;
  background: #656565;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 5px 12px 5px 3px rgba(0, 0, 0, 0.2);
  writing-mode: vertical-lr;
  transform: translateX(-20px);
  transition: 0.2s;
  ${({ isCurrent }) =>
    isCurrent &&
    `
    color: #232323;
    background: #fff;
    transform :translateX(-10px);
  `}
  @media(max-width: 1500px) {
    pointer-events: none;
    &:after {
      content: '';
      position: absolute;
      z-index: 4;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 0 20px 20px 0;
    }
    ${({ isForward }) =>
      isForward &&
      `
      pointer-events: auto;
      &:after{
        display:none;
      }
    `}
  }
`;
const TabBox = styled(OnlyAlignCenterFlex)`
  position: absolute;
  z-index: 2;
  left: 100%;
  top: 30px;
  flex-direction: column;
`;
const EditAreaBox = styled.div`
  position: relative;
  z-index: 3;
  width: 100%;
  min-height: 850px;
  background: #fff;
  border-radius: 30px;
  overflow: hidden;
  padding: 60px 20px;
  @media (max-width: 980px) {
    width: 100%;
    padding: 60px 0;
  }
  @media (max-width: 980px) {
    border-radius: 0;
    border: 0;
    background: transparent;
  }
`;

export const EditTitleBox = styled.div`
  margin-bottom: 50px;
  padding: 0 50px;
  h2 {
    font-size: 34px;
  }
  @media (max-width: 980px) {
    padding: 0 5vw;
    margin-bottom: 80px;
    h2 {
      font-size: 30px;
    }
  }
`;

const EditBox = styled.div`
  width: 100%;
  padding: 60px;
  @media (max-width: 980px) {
    padding: 0 60px 60px;
  }
  @media (max-width: 900px) {
    padding: 0 2.2222vw 60px;
  }
`;
const EditInnerBox = styled.div`
  width: 100%;
  border: 1px solid #dde6ed;
  border-radius: 30px;
  overflow: hidden;
  padding: 30px;
  @media (max-width: 1080px) {
    padding: 30px 10px;
  }
  @media (max-width: 660px) {
    padding: 0;
    border-radius: 0;
    border: 0;
    border-top: 1px solid #dde6ed;
  }
`;
const BannerTabBox = styled(MobTabBox)`
  display: flex;
`;
const BannerDetailTab = styled(MobTap)``;
