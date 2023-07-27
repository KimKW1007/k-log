import React from 'react';
/**
 * @convertContent : HTML -> DB 저장 할 때
 * @reverseConvert : DB -> HTML 로 변환
 */
const useConvert = () => {
  const convertContent = (contents: string) => {
    const convertValue = contents.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    return convertValue;
  };
  const reverseConvert = (contents: string) => {
    const reverseConvertValue = contents.replaceAll('&gt;', '>').replaceAll('&lt;', '<');
    return reverseConvertValue;
  };
  const decodeHTMLEntities = (str: any) => {
    if (str === undefined && str === null && str === '') {
      return '';
    }
    return str
      .replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&#39;/g, "'");
  };

  return { convertContent, reverseConvert, decodeHTMLEntities };
};

export default useConvert;
