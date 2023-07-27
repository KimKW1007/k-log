import React from 'react'
import useConvert from 'src/hooks/useConvert';
import hljs from 'highlight.js';

const codeBlockJsStyle = (ref : React.RefObject<HTMLDivElement>) => {
  const { decodeHTMLEntities } = useConvert();

  if(ref.current){
    const codeWrappers = ref.current.querySelectorAll('pre[class^=ql-syntax]');
    if (codeWrappers.length >= 1) {
      codeWrappers.forEach((codeWrapper) => {
        if (codeWrapper) {
          const codes = decodeHTMLEntities(codeWrapper.innerHTML).split('\n');

          const processedCodes = codes.reduce((prevCodes: string, curCode: string) => prevCodes + `<div class="line">${hljs.highlightAuto(curCode).value}</div>`, '');
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

export default codeBlockJsStyle