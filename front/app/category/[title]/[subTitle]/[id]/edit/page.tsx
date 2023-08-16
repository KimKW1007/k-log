import customApi from '@/src/utils/customApi';
import { Metadata, NextPage, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation';
import React from 'react'
import { CategoryPageProps } from '../../page';
import CreateEditPageInner from '@/src/app/category/title/subTitle/createAndEdit/CreateEditPageInner';


export const generateMetadata  = async ({ params : { title, subTitle, id} } :{params : CategoryPageProps}, parent: ResolvingMetadata): Promise<Metadata> =>{
  try {
    const decodeTitle = decodeURI(title).replaceAll('-', '/');
    const decodeSubTitle = decodeURI(subTitle).replaceAll('-', '/');
    const { getApi } = customApi(`/board/getBoard/${id}`);
    const data = await getApi();
    const { currentBoard } = data;
    const checkSubTitleInData = currentBoard.subCategory.categorySubTitle === decodeSubTitle;
    const checkTitleInData = currentBoard.subCategory.category.categoryTitle === decodeTitle;
    if (!checkSubTitleInData || !checkTitleInData) {
      notFound();
    }
    return { 
      title : decodeSubTitle + ' | K : Log',
      description : decodeSubTitle + "에 대한 게시물을 수정해보세요!"
    } 
  } catch (e) {
    notFound();
  }
  
}

const EditPage: NextPage = ({params} : any) => {
  const {title, subTitle, id} = params;
  const decodeTitle = decodeURI(title);
  const decodeSubTitle = decodeURI(subTitle);
  return (
    <CreateEditPageInner id={id} title={decodeTitle} subTitle={decodeSubTitle} isEdit/>
  )
}

export default EditPage