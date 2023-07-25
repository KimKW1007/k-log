import BoardAddForm from '@components/board/subTitlePage/BoardAddForm';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import useIsMount from 'src/hooks/useIsMount';
import styled,{keyframes} from 'styled-components';
import { BoardTitleBox } from '@components/board/BoardWrapComp';
import night_BG from '@assets/images/dark_night.jpg';

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
        <BoardTitleBox>
          {router.query &&  (currentTitle.includes('/') && currentTitle.split('/').map((ele, idx)=>(
            <p key={ele + 'salt' + idx}>{ele}</p>
          )))}
        </BoardTitleBox>
        <BoardAddForm />
      </CreateContainer>
    </CreateWrap>
  )
}

export default createPage

const CreateWrap = styled.div`
  padding: 0 50px;
  background: linear-gradient(to right, rgba(11, 11, 22, 0.8) 100%, rgba(11, 11, 22, 0.8) 100%), url(${night_BG.src}) no-repeat center center/cover fixed;
`
const CreateContainer = styled.div`
  max-width: 1300px;
  padding: 0 50px 150px;
  margin: 0 auto;
  background: #23262d;
`

