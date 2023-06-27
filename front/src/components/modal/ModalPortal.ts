import { ChildrenProps } from '@components/layout/Layout'
import React, { useEffect, useState } from 'react'
import ReactDOM from "react-dom";

const ModalPortal = ({children} : ChildrenProps) => {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
    return ()=>{setIsMount(false);}
  }, []);


  const el = document.getElementById('modal-root') as HTMLElement;

  return isMount ? ReactDOM.createPortal(children, el) : null;
}

export default ModalPortal