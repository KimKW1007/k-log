import { NextRouter } from "next/router";
import { useEffect, useState } from "react";


const useConfirm = (router: NextRouter, mutate : any)=> {
  const handlePageLeave = (e: BeforeUnloadEvent) => {
    // 새로고침 시에만 경고 메시지 표시
    e.preventDefault();
    e.returnValue = true;
  };

  const handleRouteChangeStart = (url: string, { shallow } : {shallow : any}) => {
    if (!shallow && url !== router.asPath || window.location.pathname !== router.asPath) {
      const shouldLeave = confirm(
        '이 페이지를 나가시겠습니까?\n변경사항이 저장되지 않을 수 있습니다.'
      );
      if (!shouldLeave) {
        if(window.location.pathname !== router.asPath){history.pushState(null, "", router.asPath);}
        router.events.emit('routeChangeError', url);
        throw 'routeChange aborted.';
      }else{
        mutate({})
      }
    }
  };
  return {handlePageLeave, handleRouteChangeStart}
};
export default useConfirm;