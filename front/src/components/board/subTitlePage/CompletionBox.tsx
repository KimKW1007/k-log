import { FlexEmptyBox } from '@components/signup/signupForm';
import React, { useCallback, useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import ImageInputLabelBox from '@components/common/ImageInputLabelBox';
import Image from 'next/image';
import { AllCenterFlex, OnlyAlignCenterFlex, OnlyJustifyCenterFlex } from '@components/common/CommonFlex';
import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';
interface CompletionProps {
  handleClickMenu: () => void;
  isOpen: boolean;
  boardLastId: number;
  defaultThumbnail ?: any;
}

const CompletionBox = ({ handleClickMenu, isOpen, boardLastId, defaultThumbnail }: CompletionProps) => {
  const { watch } = useFormContext();
  const [image, setImage] = useState();
  const router = useRouter();
  const [currentTitle, setCurrentTitle] = useState('');

  useEffect(() => {
    if (router.query) {
      const title = router.query.title;
      const subTitle = router.query.subTitle;
      setCurrentTitle(`/category/${title}/${subTitle}`);
    }
  }, [router.query]);

  useEffect(()=>{
    if(defaultThumbnail){
      setImage(defaultThumbnail)
    }
  },[defaultThumbnail])


  return (
    <CompletionArea>
      <CompletionDim isOpen={isOpen} onClick={handleClickMenu} />
      <CompletionContainer>
        <CompletionInnerBox>
          <CompletionTitle>발행</CompletionTitle>
          <CompletionContent>
            <AboutBoardBox>
              <BoradTitle>
                <span>제목</span>
                <h3>{watch('boardTitle') || `제목이 비어있습니다.`}</h3>
              </BoradTitle>
              <FlexEmptyBox />
              <UrlBox>
                <span>URL</span>
                <span className="customScroll">{`http://localhost:3000/${boardLastId}`}</span>
              </UrlBox>
            </AboutBoardBox>
            <ImageBox>
              {image ? <Image src={image} alt={'대표 이미지'} width={168} height={168} /> : <span>대표이미지</span>}
              <ImageInputLabelBox setImage={setImage} />
            </ImageBox>
          </CompletionContent>
          <SubmitBox>
            <SubmitBtn
              type="submit"
              onClick={() => {
                if (!watch('boardTitle')) {
                  handleClickMenu();
                }
              }}>
              저장
            </SubmitBtn>
            <CencleBtn type="button" onClick={handleClickMenu}>
              취소
            </CencleBtn>
          </SubmitBox>
        </CompletionInnerBox>
      </CompletionContainer>
    </CompletionArea>
  );
};

export default CompletionBox;

const CompletionArea = styled.div`
  position: fixed;
  z-index: 2200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
`;
const CompletionDim = styled.div<{ isOpen: boolean }>`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? `1` : `0`)};
  transition: opacity 0.3s;
  ${({ isOpen }) =>
    isOpen &&
    css`
      & + div {
        opacity: 1;
        transform: translate(0, 0);
      }
    `}
`;

const CompletionContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  margin: auto auto 0;
  padding: 40px 0;
  background: #404258;
  opacity: 0;
  transform: translate(0, 100%);
  transition: 0.3s;
`;

const CompletionInnerBox = styled.div`
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
`;

const CompletionTitle = styled.h4`
  padding: 0 0 20px;
  border-bottom: 2px solid #fff;
`;

const CompletionContent = styled.div`
  padding: 40px 0 30px;
  display: flex;
  column-gap: 80px;
`;

const AboutBoardBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const BoradTitle = styled.div`
  h3 {
    padding: 10px 0 0;
    font-size: 22px;
  }
`;

const UrlBox = styled(OnlyAlignCenterFlex)`
  border-top: 1px solid rgba(128, 128, 128, 0.6);
  border-bottom: 1px solid rgba(128, 128, 128, 0.6);
  padding: 30px 0;
  column-gap: 30px;
  font-size: 14px;
  span:nth-child(1) {
    font-weight: 800;
  }
`;

const ImageBox = styled(AllCenterFlex)`
  position: relative;
  width: 168px;
  height: 168px;
  background: #e5e5e5;
  span {
  }
  img {
    position: relative;
    z-index: 1;
    max-width: 100%;
  }
`;

const SubmitBox = styled(OnlyJustifyCenterFlex)``;
const CommonBtn = styled.button`
  padding: 10px 26px;
  line-height: 16px;
  border-radius: 20px;
  font-size: 14px;
  transition: 0.3s;
  margin: 0 5px;
`;
const CencleBtn = styled(CommonBtn)`
  border: 1px solid rgba(128, 128, 128, 0.6);
  background: #73758a;
  color: #fff;
  &:hover {
    background: ${({ theme }) => theme.color.err};
  }
`;
const SubmitBtn = styled(CommonBtn)`
  background: #fff;
  &:hover {
    background: ${({ theme }) => theme.color.success};
    color: #fff;
  }
`;
