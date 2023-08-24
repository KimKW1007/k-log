import React from 'react'

const createBlockquoteBox = (ref : React.RefObject<HTMLDivElement>) => {
  const wrapWithParent = (elements: any[]) => {
    if (elements.length > 0) {
    const parentDiv = document.createElement('div');
    parentDiv.classList.add('blockquote-box');
    const parentInnerDiv = document.createElement('div');
    parentInnerDiv.classList.add('blockquote-inner-box');
    let childDiv;
    if(elements.length > 1){
        childDiv = document.createElement('div');
    
        // 첫 번째 자식은 childDiv에 추가하지 않고, 그 이후 요소들을 모두 childDiv에 추가
        for (let i = 1; i < elements.length; i++) {
          childDiv.appendChild(elements[i]);
        }
    
        // 원래 요소(elements[0]) 앞에 childDiv를 추가하여 첫 번째 자식 제외한 요소들을 묶어줍니다.
        elements[0].parentNode.insertBefore(childDiv, elements[0].nextSibling);
      }
    elements[0].parentNode.insertBefore(parentInnerDiv, elements[0]);
    parentInnerDiv.appendChild(elements[0]);
    if(childDiv){
      parentInnerDiv.appendChild(childDiv);
    }
    if(parentInnerDiv){
      parentInnerDiv.parentNode?.insertBefore(parentDiv, parentInnerDiv);
      parentDiv.appendChild(parentInnerDiv);
    }

  }
};

const wrapConsecutiveBlockquotes = () => {
  if (ref.current) {
    const blockquotes = ref.current.querySelectorAll('blockquote');

    let tempArray: HTMLQuoteElement[] = [];

    for (let i = 0; i < blockquotes.length; i++) {
      const currentQuote = blockquotes[i];

      if (i === 0 || blockquotes[i - 1].nextElementSibling === currentQuote) {
        tempArray.push(currentQuote);
      } else {
        wrapWithParent(tempArray)
        tempArray = [currentQuote];
      }
    }
    wrapWithParent(tempArray);
  }
};
return {wrapConsecutiveBlockquotes}
}

export default createBlockquoteBox