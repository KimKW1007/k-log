import { useState, useCallback, useRef, createRef, useEffect } from "react";
/**
 * 
 * @returns {ref1, ref2, onMouseOver, onMouseLeave}
 */
const useInfinityRolling = (newData: {id : number; title : string; link : string}[]) => {
  const [ref1OffsetLeft, setRef1OffsetLeft] = useState(0);
  const [ref2OffsetLeft, setRef2OffsetLeft] = useState(0);
  const ref1 = useRef<HTMLDivElement>(null);  
  const ref2 = useRef<HTMLDivElement>(null);  
  const refsClientWidth = ref1.current?.clientWidth;
  const [isMouseOn, setIsMouseOn] = useState(false);
  const [isRollingOn, setIsRollingOn] = useState(false);
  let interval: string | number | NodeJS.Timeout | undefined;

  
  const rolling = ()=>{
    if(ref1.current &&  ref2.current){
      if(ref1OffsetLeft <= -refsClientWidth!){
        ref1.current.style.left = `${refsClientWidth}px`;
        setRef1OffsetLeft(refsClientWidth!)
      }
      if(ref2OffsetLeft <= -refsClientWidth!){
        ref2.current.style.left = `${refsClientWidth}px`;
        setRef2OffsetLeft(refsClientWidth!)
      }
      ref1.current.style.left = `${ref1OffsetLeft}px`;
      ref2.current.style.left = `${ref2OffsetLeft}px`;
      setRef1OffsetLeft(prev => prev - .2)
      setRef2OffsetLeft(prev => prev - .2)
    }
  }

   const handleRestart = () => {
      if (!interval) {
        interval = setInterval(rolling, 1);
      }
  };

  const handleStop = () => {
    if (interval) {
      clearInterval(interval);
      interval = undefined;
    }
  };
  const onMouseOver = ()=>setIsMouseOn(true)
  const onMouseLeave = ()=>setIsMouseOn(false)


  useEffect(()=>{
    if(isRollingOn){
      if(!isMouseOn) {
        handleRestart()
      }else{
        handleStop()
      }
    }
    return ()=> {clearInterval(interval);}
  })
  
  useEffect(()=>{
    if(ref1.current && ref2.current && newData?.length >= 9){
      ref2.current.style.left = `${ref1.current.clientWidth}px`;
      const ref1Left = window.getComputedStyle(ref1.current).getPropertyValue('left').split("px").join('');
      const ref2Left = window.getComputedStyle(ref2.current).getPropertyValue('left').split("px").join('');
      setRef1OffsetLeft(Number(ref1Left))
      setRef2OffsetLeft(Number(ref2Left))
      if(ref2.current.style.left === `${ref1.current.clientWidth}px`){
        setIsRollingOn(true)
      }
    }
  },[ref1, ref2, newData])



  return {
    ref1,
    ref2,
    onMouseOver,
    onMouseLeave,
  };
};
export default useInfinityRolling;