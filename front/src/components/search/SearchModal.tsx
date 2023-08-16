import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ModalWrap, Dim } from '../modal/CommonModal';
import { DeleteModalBox } from '../modal/DeleteModal';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import Esc from '@/src/assets/images/esc.svg';
import SearchListBox from './SearchListBox';
import NoResult from './NoResult';
import SearchRecent from './SearchRecent';
import SearchInputBox from './SearchInputBox';
import useIsMount from '@/src/hooks/useIsMount';
import ModalPortal from '../modal/ModalPortal';
import { OnlyAlignCenterFlex } from '../common/CommonFlex';
import { searchModalState, searchRecent } from '@/src/atoms/atoms';
import customApi from '@/src/utils/customApi';
import TypingLoading from '../common/Loading/TypingLoading';

const SearchModal = ({ onClose }: { onClose: () => void }) => {
  const [isOpenSearchModal, setIsOpenSearchModal] = useRecoilState(searchModalState);
  const methods = useForm({ mode: 'onSubmit' });
  const { watch } = methods;

  const { isMount } = useIsMount();

  const [searchedData, setSearchedData] = useState([]);
  const [searchedDataWithTag, setSearchedDataWithTag] = useState([]);

  const [isTyping, setIsTyping] = useState(false);

  const [recentBoard, setRecentBoard] = useRecoilState(searchRecent);

  const { postApi } = customApi('/board/search');
  const { mutate, isLoading } = useMutation(postApi, {
    onSuccess(data, variables, context) {
      setIsTyping(false);
      const value = watch('search').trim();
      const filteredData = data.filter((item: any) => item.boardTitle.toLowerCase().includes(value.toLowerCase()) || item.contents.toLowerCase().includes(value.toLowerCase()));
      const filteredDataWithTag = data.filter((item: any) => item.tags.toLowerCase().includes(value.toLowerCase()));
      setSearchedData(filteredData.slice(0, 5));
      setSearchedDataWithTag(filteredDataWithTag.slice(0, 5));
    }
  });

  const handleKeyDown = (e: { code: string }) => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  useEffect(() => {
    if (isOpenSearchModal) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpenSearchModal]);

  useEffect(() => {
    let mutateTimer: NodeJS.Timeout | undefined;
    if (watch('search')?.length > 0) {
      clearTimeout(mutateTimer);
      mutateTimer = setTimeout(() => {
        mutate({ searchValue: watch('search').trim() });
      }, 500);
    } else {
      setIsTyping(false);
    }
    return () => clearTimeout(mutateTimer);
  }, [watch('search'), isMount]);

  const isTyping_REGEX = isTyping || isLoading;
  const isValueOverZero = watch('search')?.length > 0;
  const noRecentSearches_REGEX = isTyping_REGEX || isValueOverZero || recentBoard.length > 0;

  return (
    <ModalPortal>
      <SearchWrap>
        <SearchDim onClick={onClose} />
        <FormProvider {...methods}>
          <SearchModalBox>
            <ModalInnerBox>
              <SearchInputBox setIsTyping={setIsTyping} />
              <SearchListArea className="customScroll">
                <SearchRecent />
                {isTyping_REGEX && <TypingLoading />}
                {noRecentSearches_REGEX || (
                  <NoRecentSearches>
                    <p>No Recent Searches</p>
                  </NoRecentSearches>
                )}
                {isTyping_REGEX ||
                  (isValueOverZero && (
                    <>
                      {searchedData.length > 0 || searchedDataWithTag.length > 0 ? (
                        <>
                          <SearchListBox data={searchedData} title={'Title | Contents'} currentValue={watch('search').trim()} />
                          <SearchListBox data={searchedDataWithTag} title={'Tags'} currentValue={watch('search').trim()} />
                        </>
                      ) : (
                        <NoResult value={watch('search').trim()} />
                      )}
                    </>
                  ))}
              </SearchListArea>
            </ModalInnerBox>
            <SearchFooter>
              <SearchCommands>
                <CommandsIcon />
                <span>to close</span>
              </SearchCommands>
            </SearchFooter>
          </SearchModalBox>
        </FormProvider>
      </SearchWrap>
    </ModalPortal>
  );
};

export default SearchModal;

const SearchListArea = styled.div`
  width: 100%;
  max-height: 480px;
  overflow-y: scroll;
  padding: 0 10px 0 20px;
`;

const SearchFooter = styled.div`
  width: 100%;
  padding: 20px;
`;

const SearchCommands = styled(OnlyAlignCenterFlex)`
  justify-content: end;
  span {
    font-size: 14px;
  }
`;
const CommandsIcon = styled.div`
  width: 24px;
  height: 18px;
  background: url(${Esc.src}) no-repeat center center/100% auto;
  margin-right: 6px;
`;

const SearchModalBox = styled(DeleteModalBox)`
  margin: 100px auto auto;
  border-radius: 4px;
  background: #454545;
  color: #fff;
  padding: 20px 0 0;
  box-shadow: 0 0px 10px rgba(255, 255, 255, 0.2);
`;

const SearchWrap = styled(ModalWrap)`
  display: block;
`;

const SearchDim = styled(Dim)`
  background: rgba(0, 0, 0, 0.5);
`;

const NoRecentSearches = styled.div`
  padding: 56px 0 36px;
  text-align: center;
  font-size: 14px;
  color: #ffffffa1;
`;

const ModalInnerBox = styled.div`
  width: 100%;
`;
