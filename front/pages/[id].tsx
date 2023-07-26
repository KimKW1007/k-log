import BoardDetail from '@components/board/BoardDetail'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { CategoryPageProps } from './category/[title]/[subTitle]'

const BoardPage : NextPage = ({id} : CategoryPageProps) => {
  return (
    <div>
      <BoardDetail id={id}/>
    </div>
  )
}

export const  getServerSideProps: GetServerSideProps = async ( context  )=>{
  const {query} = context;
  const {id} = query;
  return {
    props : { id }
  }
}
export default BoardPage
