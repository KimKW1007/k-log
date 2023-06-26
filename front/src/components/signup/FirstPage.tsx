import CheckBoxInputs from '@components/common/CheckBoxInputs'
import React, { useEffect, useState } from 'react'

interface isAllCheckedProps {
  setIsAllChecked : React.Dispatch<React.SetStateAction<boolean>>
}

const FirstPage = ({setIsAllChecked} : isAllCheckedProps ) => {
  const [isAgree, setIsAgree] = useState([false, false]);
  const onClickAgree = (idx: number) => ()=>{
    const newIsAgree = [...isAgree];
    newIsAgree[idx] = !newIsAgree[idx]
    setIsAgree(newIsAgree);
  }
  useEffect(()=>{
    if(isAgree[0] && isAgree[1]){
      setIsAllChecked(true)
    }else{
      setIsAllChecked(false)
    }
    return ()=>{}
  },[isAgree])
  return (
    <div>
      <CheckBoxInputs id="id" onClick={onClickAgree(0)}>계정동의</CheckBoxInputs>
      <CheckBoxInputs id="id1" onClick={onClickAgree(1)}>계정동의</CheckBoxInputs>
    </div>
  )
}

export default FirstPage