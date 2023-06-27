import CheckBoxInputs from '@components/common/CheckBoxInputs';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface isAllCheckedProps {
  setIsAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const FirstPage = ({ setIsAllChecked }: isAllCheckedProps) => {
  const [isAgree, setIsAgree] = useState([false, false]);
  const onClickAgree = (idx: number) => () => {
    const newIsAgree = [...isAgree];
    newIsAgree[idx] = !newIsAgree[idx];
    setIsAgree(newIsAgree);
  };
  useEffect(() => {
    if (isAgree[0] && isAgree[1]) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
    return () => {};
  }, [isAgree]);
  return (
    <React.Fragment>
      <CheckInputsBox>
        <CheckBoxInputs id="id" onClick={onClickAgree(0)}>
          K-log 서비스 약관에 동의 &#40;필수&#41;
        </CheckBoxInputs>
        <CheckBoxInputs id="id1" onClick={onClickAgree(1)}>
          개인정보 수집 및 이용에 동의 &#40;필수&#41;
        </CheckBoxInputs>
      </CheckInputsBox>
      <EmptyBox/>
    </React.Fragment>
  );
};

export default FirstPage;

export const EmptyBox = styled.div`
  width: 100%;
  flex-grow: 1;
`;

const CheckInputsBox = styled.div`
  width: 100%;
`