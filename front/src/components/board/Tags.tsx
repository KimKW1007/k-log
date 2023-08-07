import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled, { keyframes } from 'styled-components';
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import TagItem from './TagItem';
const Tags = ({ setCurrentTags, currentTags }: { setCurrentTags: React.Dispatch<React.SetStateAction<string[]>>; currentTags: string[] }) => {
  const { register, setValue, watch } = useFormContext();

  const handleRemoveTag = (tag: string) => () => {
    const copiedTags = [...currentTags];
    const removeCurrentTag = copiedTags.filter((x) => x !== tag);
    setCurrentTags(removeCurrentTag);
  };

  const handleCheckValue = (value: string) => {
    if (value.includes(',')) {
      alert("특수기호 ',' 는 사용 할 수 없습니다.");
      setValue('tagsInput', value.replace(',', ''));
    }
  };

  const handleAddTag = (key: string) => {
    if (key === 'Enter' && watch('tagsInput')[0] === '#') {
      const isDuplication = currentTags.find((x) => x === watch('tagsInput'));
      if (isDuplication) {
        alert('이미 추가된 태그입니다.');
      } else {
        setCurrentTags((prev: string[]) => [...prev, watch('tagsInput')]);
      }
      return
    }
    if(key === 'Enter'){
      alert('태그를 추가하시려면\n태그 앞에 "#"을 붙혀주세요.');
    }
  };

  useEffect(() => {
    setValue('tagsInput', '');
  }, [currentTags]);

  return (
    <TagsBox>
      <p>Tags</p>
      <TagsInnerBox>
        <TagsInput
          {...register('tagsInput', {
            onChange(e) {
              handleCheckValue(e.target.value);
            }
          })}
          autoComplete="off"
          onKeyUp={(e) => {
            handleAddTag(e.key);
          }}
          placeholder='ex) #태그할 래용'
        />
        {currentTags.length >= 1 && (
          <TagItemBox>
            {currentTags.map((tag, idx) => <TagItem key={tag + idx} tag={tag} handleRemoveTag={handleRemoveTag(tag)} />)}
          </TagItemBox>
        )}
      </TagsInnerBox>
    </TagsBox>
  );
};

export default Tags;

const TagsBox = styled.div`
  border-bottom: 1px solid rgba(128, 128, 128, 0.8);
  margin-bottom: 30px;
  padding: 20px 0 30px;
  p {
    padding-bottom: 20px;
  }
`;
const TagsInnerBox = styled.div`
  border: 1px solid rgba(128, 128, 128, 0.8);
  padding: 5px 10px ;
`;
const TagsInput = styled.input`
  width: 100%;
  line-height: 20px;
  padding: 10px 0;
  background: transparent;
  outline: none;
  color: #fff;
`;
const TagItemBox = styled(OnlyAlignCenterFlex)`
  width:100%;
  padding: 5px 0 8px;
  flex-wrap:wrap;

`