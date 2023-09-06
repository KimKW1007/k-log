
const useConfirm = (pathname: string) => {
  const handlePageLeave = (e: BeforeUnloadEvent) => {
    // 새로고침 시에만 경고 메시지 표시
    e.preventDefault();
    e.returnValue = true;
  };

  const handleRouteChangeStart = (url: string, { shallow }: { shallow: any }) => {
    if ((!shallow && url !== pathname) || window.location.pathname !== pathname) {
      const shouldLeave = confirm('이 페이지를 나가시겠습니까?\n변경사항이 저장되지 않을 수 있습니다.');
      if (!shouldLeave) {
        if (window.location.pathname !== pathname) {
          history.pushState(null, '', pathname);
        }
        throw 'routeChange aborted.';
      } 
    }
  };
  return { handlePageLeave, handleRouteChangeStart };
};
export default useConfirm;
