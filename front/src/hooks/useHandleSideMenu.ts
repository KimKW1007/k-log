import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/router';

const useHandleSideMenu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClickMenu = () => {
    if (isOpen === isActive) {
      if (!isOpen) {
        setIsActive(true);
        setTimeout(() => {
          setIsOpen(true);
        }, 10);
      } else {
        setIsOpen(false);
        setTimeout(() => {
          setIsActive(false);
        }, 600);
      }
    }
  };
  useEffect(() => {
    if (isOpen) {
      handleClickMenu();
    }
  }, [router.asPath]);
  return {handleClickMenu , isOpen, isActive}
}

export default useHandleSideMenu