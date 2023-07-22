import React from 'react'
/**
 * @convertContent : HTML -> DB 저장 할 때
 * @reverseConvert : DB -> HTML 로 변환
 */
const useConvert = () => {
  const convertContent = (contents: string)=>{
    const convertValue = contents.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    return convertValue
  }
  const reverseConvert = (contents: string)=>{
    const reverseConvertValue = contents.replaceAll("&gt;", ">").replaceAll("&lt;", "<");
    return reverseConvertValue
  }

  return {convertContent, reverseConvert}
}

export default useConvert