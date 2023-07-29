import BoardAddForm from '@components/board/subTitlePage/BoardAddForm';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import useIsMount from 'src/hooks/useIsMount';
import styled,{keyframes} from 'styled-components';
import { BoardTitleBox } from '@components/board/BoardWrapComp';
import night_BG from '@assets/images/dark_night.jpg';
import { GetServerSideProps } from 'next';
import { CategoryPageProps } from '.';
import withGetServerSideProps from '@utils/Seo/withGetServerSideProps';

const createPage = ({title, subTitle} : CategoryPageProps) => {
  const {isMount} = useIsMount();
  const [currentTitle, setCurrentTitle] = useState('');
 
  useEffect(()=>{
    setCurrentTitle(title + '/' + subTitle)
  },[isMount])
  return (
    <CreateWrap>
      <CreateContainer>
        <BoardTitleBox>
          {isMount &&  (currentTitle.includes('/') && currentTitle.split('/').map((ele, idx)=>(
            <p key={ele + 'salt' + idx}>{ele}</p>
          )))}
        </BoardTitleBox>
        <BoardAddForm />
      </CreateContainer>
    </CreateWrap>
  )
}
export const getServerSideProps : GetServerSideProps = withGetServerSideProps(async (context) => {
  const {query} = context;
  const {title, subTitle} = query;
  return {
    props : {title, subTitle}
  }
});
export default createPage

export const CreateWrap = styled.div`
  padding: 0 50px;
  background: linear-gradient(to right, rgba(11, 11, 22, 0.8) 100%, rgba(11, 11, 22, 0.8) 100%), url(${night_BG.src}) no-repeat center center/cover fixed;
`
export const CreateContainer = styled.div`
  max-width: 1300px;
  padding: 0 50px 150px;
  margin: 0 auto;
  background: #23262d;
`

