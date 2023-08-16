import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const useHandleSideMenu = () => {
  const pathname = usePathname();
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
  }, [pathname]);
  return { handleClickMenu, isOpen, isActive };
};

export default useHandleSideMenu;
