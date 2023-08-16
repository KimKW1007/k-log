import BoardPageInner from '@/src/app/board/BoardPageInner'
import customApi from '@/src/utils/customApi';
import { Metadata, NextPage, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react'

export const generateMetadata  = async ({ params : { id } } :{params : {id : string}}, parent: ResolvingMetadata): Promise<Metadata> =>{
  try {
    const { getApi } = customApi(`/board/getBoard/${id}`);
    const data = await getApi();
    const { currentBoard } = data;
    return {
      title :currentBoard.boardTitle + ' | K : Log',
      description : currentBoard.boardTitle + "에 관한 게시물을 확인해 보세요!"
    };
  } catch (e) {
    notFound()
  }
  
}

const BaordPage: NextPage = ({params} : any) => {
  const { id } = params;

  return (
    <BoardPageInner id={id}/>
  )
}


export default BaordPage