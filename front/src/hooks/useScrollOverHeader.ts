import React, { useEffect, useState } from 'react'

const useScrollOverHeader = () => {
  const [isOverHeader, setIsOverHeader] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
       
        if(window.scrollY >= 10){
          setIsOverHeader(true)
        }else{
          setIsOverHeader(false)
        }
    });
    return () => window.removeEventListener('scroll', () => {});
  });

  return {isOverHeader}
}

export default useScrollOverHeader