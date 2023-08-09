import React from 'react'
import styled, {keyframes} from 'styled-components';
import SearchListBox from './SearchListBox';
import { searchRecent } from '@atoms/atoms';
import { useRecoilState } from 'recoil';

const SearchRecent = () => {
  const [recentBoard, setRecentBoard] = useRecoilState(searchRecent);

  return (
    <SearchListBox data={recentBoard} title={'Recent'} currentValue={''} isRecent />
  )
}

export default SearchRecent