import React from 'react'
import useConvert from 'src/hooks/useConvert';

const codeBlockStyler = (ref : React.RefObject<HTMLDivElement>) => {
  if(ref.current){
    const codeWrappers = ref.current.querySelectorAll('pre[class^=ql-syntax]');
    if (codeWrappers.length > 0) {
      codeWrappers.forEach((codeWrapper) => {
        if (codeWrapper) {
          const codes = codeWrapper.innerHTML.split('\n').slice(0,-1);
          const processedCodes = codes.reduce((prevCodes: string, curCode: string) => prevCodes + `<div class="line">${curCode}</div>`, '');
          const codeBody = `<div class="code-body">${processedCodes}</div>`;

          const codeHeader = `
        <div class="code-header">
          <span class="red btn"></span>
          <span class="yellow btn"></span>
          <span class="green btn"></span>
        </div>`;

          codeWrapper.innerHTML = codeHeader + codeBody;
        }
      });
    }
  }
}
export default codeBlockStyler