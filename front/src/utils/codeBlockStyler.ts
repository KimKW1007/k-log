import React from 'react';
import 'highlight.js/styles/atom-one-dark.css';

const codeBlockStyler = (ref: React.RefObject<HTMLDivElement>) => {
  if (ref.current) {
    const codeWrappers = ref.current.querySelectorAll('pre[class^=ql-syntax]');
    if (codeWrappers.length > 0) {
      let isHljsString = 'off';
      codeWrappers.forEach((codeWrapper) => {
        if (codeWrapper) {
          const codes = codeWrapper.innerHTML.split('\n').slice(0, -1);
          const processedCodes = codes.reduce((prevCodes: string, curCode: string) => {
            let code = curCode;
            if (curCode.endsWith('<span class="hljs-string">`')) {
              if (isHljsString === 'off') {
                isHljsString = 'on';
              }
            } else if (curCode.includes('`</span>')) {
              if (isHljsString === 'on') {
                isHljsString = 'off';
                const splitValue = curCode.split('</span>');
                code = `<span class="hljs-string">${splitValue[0]}</span>${splitValue.slice(1)}`;
              }
            } else {
              if (isHljsString === 'on') {
                code = `<span class="hljs-string">${curCode}</span>`;
              }
            }
            return prevCodes + `<div class="line">${code}</div>`;
          }, '');
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
};
export default codeBlockStyler;
