import React, { useEffect, useState } from 'react'

const useScrollOverHeader = () => {
  const [isOverHeader, setIsOverHeader] = useState(false);

  const handleScrollState = ()=>{
    if(window.scrollY >= 10){
      setIsOverHeader(true)
    }else{
      setIsOverHeader(false)
    }
  }

  useEffect(()=>{
    handleScrollState()
  },[])
  useEffect(() => {
    window.addEventListener('scroll', () => {
      handleScrollState()
    });
    return () => window.removeEventListener('scroll', () => {});
  });

  return {isOverHeader}
}

export default useScrollOverHeader