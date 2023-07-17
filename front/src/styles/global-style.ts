import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}

html,
body,
div,
span,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
abbr,
address,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
samp,
small,
strong,
sub,
sup,
var,
a,
b,
button,
i,
input,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
textarea,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  box-sizing:border-box;
}

*::selection{
  background: #c9c9c9;
  color: #212121;
}

html{
  overflow-y: scroll;
}

html,
body,
#__next{
  width: 100%;
  height: 100%;
}

body{
    font: normal 16px/1 'Pretendard-Regular';
    font-family :  'Pretendard-Regular', 'Noto Sans KR',-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background:#23262d;
    color: #fff;
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #fff;
      border-radius: 10px;
      background-clip: padding-box;
      border: 2px solid transparent;
    }
    &::-webkit-scrollbar-track {
      margin: 10px 0;
    }
}

a{
  text-decoration: none;
  color: #fff;
}

ul,li,ol{
  list-style: none;
}

i,em,address{
  font-style: normal;
}

button{
  cursor: pointer;
}

main,header,footer,section,nav,article{
  display: block;
}

.blind{
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  clip: rect(0,0,0,0);
  overflow: hidden;
}

.hide{
  display: none;
}
.hidden{
  overflow: hidden;
}

.certified{
  position:relative;
  pointer-events: none;
  &::after{
    content:"";
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    z-index:4;
    background: rgba(0,0,0,.4);
  }
}

.customScroll{
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #fff;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  
}

`;
