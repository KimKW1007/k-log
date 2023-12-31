import styled, { keyframes } from 'styled-components';

export const ContentsWrap = styled.div`
  * {
    font-family: 'Pretendard-Regular' !important;
  }
  padding: 150px 0 100px;
  min-height: 1000px;

  line-height: 1.8;
  border-bottom: 1px solid ${({theme}) => theme.color.lightGrey};

  img {
    max-width: 100%;
  }
  pre[class^='ql-syntax'] {
    position: relative;
  }
  h1,h2,h3{
    line-height: 1.5;
  }
  .blockquote-box {
    border-left: 4px solid #63E6BE;
    overflow: hidden;
    margin : 10px 0;
    .blockquote-inner-box {
      display: block;
      overflow: hidden;
      border: 1px solid ${({theme}) => theme.color.lightGrey};
      border-left: 0;
      border-radius: 0 5px 5px 0;
      > blockquote {
        position: relative;
        z-index: 2;
        padding: 16px 16px 16px 32px;
        background: #323232;
      }
      > div {
        position: relative;
        z-index: 1;
        padding: 20px 16px 20px 32px;
        background: #232323;
      }
    }
  }
  .ql-align-center{
    text-align: center;
  }
  .ql-align-right{
    text-align: right;
  }
  .ql-align-justify {
    text-align: justify;
  }
  pre[class^='ql-syntax']::after {
    content: attr(data-ke-language);
    position: absolute;
    bottom: 8px;
    right: 12px;
    color: #cfd2d1;
  }

  pre[class^='ql-syntax'] {
    display: flex !important;
    flex-direction: column;
    padding: 0 !important;
    font-size: 14px;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgb(0 0 0 / 40%);
    color: #cfd2d1;
    background-color: #343131;
    font-family: Menlo, Courier, monospace;
  }

  pre[class^='ql-syntax'] .line {
    counter-increment: line-idx;
    line-height: 1.5;
    margin: 2px 0;
    white-space: pre-wrap;
  }

  pre[class^='ql-syntax'] .line:hover {
    backdrop-filter: brightness(0.92);
  }

  pre[class^='ql-syntax'] .line:hover::before {
    color: #cfd2d1;
  }

  pre[class^='ql-syntax'] .line::before {
    content: counter(line-idx);
    width: 24px;
    display: inline-block;
    text-align: right;
    margin-right: 16px;
    font-size: 0.8rem;
    color: #747a7a;
  }

  pre[class^='ql-syntax'] .code-header {
    display: flex;
    align-items: center;
    padding: 14px;
    background-color: #434041;
    border-radius: 8px 8px 0 0;
  }

  pre[class^='ql-syntax'] .code-header .btn {
    border-radius: 50%;
    width: 15px;
    height: 15px;
    margin: 0 5px;
  }

  pre[class^='ql-syntax'] .code-header .btn.red {
    background-color: #f5655b;
  }

  pre[class^='ql-syntax'] .code-header .btn.yellow {
    background-color: #f6bd3b;
  }

  pre[class^='ql-syntax'] .code-header .btn.green {
    background-color: #43c645;
  }

  pre[class^='ql-syntax'] .code-body {
    max-height: 600px;
    margin: 24px 8px;
    overflow: auto;
  }

  pre[class^='ql-syntax'] .code-body::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  pre[class^='ql-syntax'] .code-body::-webkit-scrollbar-thumb {
    background-color: rgb(1 2 3 / 80%);
    border-radius: 10px;
  }
  pre[class^='ql-syntax'] .code-body::-webkit-scrollbar-track:horizontal {
    margin: 0 30px;
  }

  pre[class^='ql-syntax'] .code-body::-webkit-scrollbar-corner {
    display: none;
  }

  ol, ul{
    padding-left: 1.5em;
  }

  ol li:not(.ql-direction-rtl),
  ul li:not(.ql-direction-rtl) {
    padding-left: 1.5em;
  }

  ol li {
    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
    counter-increment: list-0;
  }

  ol li:before {
    content: counter(list-0, decimal) '. ';
  } 
  ul > li:before {
    content: "•";
  }

  li:not(.ql-direction-rtl)::before {
    margin-left: -1.5em;
    margin-right: 0.3em;
    text-align: right;
  }

  li::before {
    display: inline-block;
    white-space: nowrap;
    width: 1.2em;
  }

  li.ql-indent-1:not(.ql-direction-rtl) {
    padding-left: 4.5em;
  }
  li.ql-indent-2:not(.ql-direction-rtl) {
    padding-left: 7.5em;
  }
  

  @media(max-width : 930px){
    padding : 16.129vw 0 100px;
  }
`;
