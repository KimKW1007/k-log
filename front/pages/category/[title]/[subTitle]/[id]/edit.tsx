import BoardAddForm from '@components/board/subTitlePage/BoardAddForm';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import useIsMount from 'src/hooks/useIsMount';
import styled,{keyframes} from 'styled-components';
import { BoardTitleBox } from '@components/board/BoardWrapComp';
import night_BG from '@assets/images/dark_night.jpg';
import { CreateContainer, CreateWrap } from '../create';
import BoardEditForm from '@components/board/BoardEditForm';
import { GetServerSideProps, NextPage } from 'next';
import { CategoryPageProps } from '..';


const BoardEditPage : NextPage = ({title, subTitle, id} : CategoryPageProps) => {
  console.log({id})
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
        <BoardEditForm subTitle={subTitle} id={id} />
      </CreateContainer>
    </CreateWrap>
  )
}
export const  getServerSideProps: GetServerSideProps = async ( context  )=>{
  const {query} = context;
  const {title, subTitle, id} = query;
  return {
    props : {title, subTitle, id}
  }
}
export default BoardEditPage