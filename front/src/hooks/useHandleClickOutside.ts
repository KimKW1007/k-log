import React, { useEffect } from 'react'

const useHandleClickOutside = (ref : React.RefObject<HTMLDivElement>,setState : React.Dispatch<React.SetStateAction<boolean>>) => {
  const handleClickOutside = (e : any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setState(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
}

export default useHandleClickOutside