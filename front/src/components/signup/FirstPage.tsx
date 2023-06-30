import CheckBoxInputs from '@components/common/CheckBoxInputs';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { agreeList } from 'utils/mapList';

interface isAllCheckedProps {
  setIsAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const FirstPage = ({ setIsAllChecked }: isAllCheckedProps) => {
  const [isServiceAgree, setIsServiceAgree] = useState(false);
  const [isCollectionAgree, setIsCollectionAgree] = useState(false);

  const onClickAgreeBtn = (id: string) => () => {
    if (id === 'serviceAgree') setIsServiceAgree((prev) => !prev);
    if (id === 'collectionAgree') setIsCollectionAgree((prev) => !prev);
  };

  useEffect(() => {
    if (isServiceAgree && isCollectionAgree) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
    return () => {};
  }, [isServiceAgree, isCollectionAgree]);
  return (
    <React.Fragment>
      <CheckInputsBox>
        {agreeList.map(({ id, text }) => (
          <CheckBoxInputs id={id} onClick={onClickAgreeBtn(id)}>
            <strong>{text}</strong>에 동의 &#40;필수&#41;
          </CheckBoxInputs>
        ))}
      </CheckInputsBox>
      <FlexEmptyBox />
    </React.Fragment>
  );
};

export default FirstPage;

export const FlexEmptyBox = styled.div`
  width: 100%;
  flex-grow: 1;
`;

const CheckInputsBox = styled.div`
  width: 100%;
`;
