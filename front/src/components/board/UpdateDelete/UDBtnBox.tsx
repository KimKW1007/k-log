import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Settings } from '@styled-icons/material-rounded/Settings';
import { Trash } from '@styled-icons/bootstrap/Trash';
import { AllCenterFlex } from '@/src/components/common/CommonFlex';
import DeleteModal from '@/src/components/modal/DeleteModal';
import customApi from '@/src/utils/customApi';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { PencilSquare } from '@styled-icons/bootstrap';
import useHandleClickOutside from '@/src/hooks/useHandleClickOutside';

const UDBtnBox = ({ id }: { id: string;  }) => {
  const settingsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [isActive, setIsActive] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { deleteApi } = customApi(`/board/deleteBoard/${id}`);
  const { mutate } = useMutation(deleteApi, {
    onSuccess(data) {
      router.replace(`/category`);
    }
  });

  const handleDeleteBtn = () => {
    setIsOpenModal(true);
  };

  const handleUpdateBtn = () => {
    router.push(`/${id}/edit`);
  };

  useHandleClickOutside(settingsRef, setIsActive);

  return (
    <>
      <UDBtnArea ref={settingsRef}>
        <BoardSettingBtn title="게시물 설정" onClick={() => setIsActive((prev) => !prev)}>
          <Settings />
        </BoardSettingBtn>
        <BoardDeleteBtn isActive={isActive} title="게시물 삭제" onClick={handleDeleteBtn}>
          <Trash />
        </BoardDeleteBtn>
        <BoardUpdateBtn isActive={isActive} title="게시물 수정" onClick={handleUpdateBtn}>
          <PencilSquare />
        </BoardUpdateBtn>
      </UDBtnArea>
      {isOpenModal && <DeleteModal mutate={() => mutate({})} onClose={() => setIsOpenModal(false)} />}
    </>
  );
};

export default UDBtnBox;

const UDBtnArea = styled(AllCenterFlex)`
  position: fixed;
  z-index: 9;
  right: 30px;
  bottom: 30px;
  width: 45px;
  height: 45px;
`;

const DefaultBtn = styled.button`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 12px;
  border-radius: 50%;
  background: #a076f9;
  transition: all 0.3s, border-radius 0.3s 0.2s;
  svg {
    width: 100%;
    color: #fff;
  }
`;

const BoardDeleteBtn = styled(DefaultBtn)<{ isActive: boolean }>`
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0.6) rotate(45deg);
  transform-origin: center center;
  border-radius: 30px 30px 0px 30px;
  svg {
    transform: rotate(-45deg);
  }
  ${({ isActive }) =>
    isActive &&
    `
  top: -70%;
  border-radius: 30px 30px 30px 30px;
  transform :translate(-50%, -50%) scale(1) rotate(45deg); 
`}
  &:hover {
    background: ${({ theme }) => theme.color.err};
  }
`;
const BoardUpdateBtn = styled(DefaultBtn)<{ isActive: boolean }>`
  left: 50%;
  top: 50%;
  border-radius: 30px 30px 0px 30px;
  transform: translate(-50%, -50%) scale(0.6) rotate(-45deg);
  svg {
    transform: rotate(45deg);
  }
  ${({ isActive }) =>
    isActive &&
    `
  left: -70%;
  border-radius: 30px 30px 30px 30px;
  transform :translate(-50%, -50%) scale(1) rotate(-45deg); 
`}
  &:hover {
    background: ${({ theme }) => theme.color.success};
  }
`;
const BoardSettingBtn = styled(DefaultBtn)`
  position: relative;
  z-index: 3;
`;
