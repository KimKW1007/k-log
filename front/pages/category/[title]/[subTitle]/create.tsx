import SubTitleAddForm from '@components/category/subTitlePage/SubTitleAddForm';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import useIsMount from 'src/hooks/useIsMount';
import styled,{keyframes} from 'styled-components';

const createPage = () => {
  const router = useRouter();
  const {isMount} = useIsMount();
  const [currentTitle, setCurrentTitle] = useState('');
 
  useEffect(()=>{
    if(router.query){
      const title = router.query.title;
      const subTitle = router.query.subTitle;
      setCurrentTitle(title + '/' + subTitle)
    }

  },[router.query])
  return (
    <CreateWrap>
      <CreateContainer>
        <CreateTitle>
          {router.query && currentTitle}
        </CreateTitle>
        <SubTitleAddForm />
      </CreateContainer>
    </CreateWrap>
  )
}

export default createPage

const CreateWrap = styled.div`
  padding: 100px 50px;
`
const CreateContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const CreateTitle = styled.div`
  text-align: center;
  padding: 0 0 80px;
  font-size : 40px;
`