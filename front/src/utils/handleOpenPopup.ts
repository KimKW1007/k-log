
/**
 * 
 * @param url 
 * @param target 
 * @param width 
 * @param height 
 */
export const handleOpenPopup = (url:string, target: string, width:number, height:number)=>{
  const left = window.screenX + (window.outerWidth - width) / 2 -17;
  const top = window.screenY + (window.outerHeight - height) / 2;
  window.open(
    `${url}`,
    `${target}`,
    `width=${width},height=${height},left=${left},top=${top}, scrollbars=no , toolbar=no, staus=no, memubar=no, location=no, directoryies=no, resizable=no`
  );
}