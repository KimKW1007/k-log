import { ChildrenProps } from '@src/types/children';
import React, { useEffect, useState } from 'react'
import ReactDOM from "react-dom";
import useIsMount from 'src/hooks/useIsMount';

const ModalPortal = ({children} : ChildrenProps) => {
  const {isMount} = useIsMount();



  const el = document.getElementById('modal-root') as HTMLElement;

  return isMount ? ReactDOM.createPortal(children, el) : null;
}

export default ModalPortal