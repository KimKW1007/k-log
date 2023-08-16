import CreateEditPageInner from '@/src/app/category/title/subTitle/createAndEdit/CreateEditPageInner'
import customApi from '@/src/utils/customApi';
import { Metadata, NextPage, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react'
import { CategoryPageProps } from '../page';


export const generateMetadata  = async ({ params : { title, subTitle} } :{params : CategoryPageProps}, parent: ResolvingMetadata): Promise<Metadata> =>{
  try {
    const decodeTitle = decodeURI(title).replaceAll('-', '/');
    const decodeSubTitle = decodeURI(subTitle).replaceAll('-', '/');
    const { getApi } = customApi(`/category/getSubCategory/${decodeTitle}`);
    const data = await getApi();
    const checkSubTitleInData = data.subCategories.find((x: { categorySubTitle: string }) => x.categorySubTitle === decodeSubTitle);
    if (!checkSubTitleInData) {
      notFound();
    }
    return { 
      title : decodeSubTitle + ' | K : Log',
      description : decodeSubTitle + "에 대한 새로운 게시물을 만들어보세요!"
    } 
  } catch (e) {
    notFound();
  }
  
}

const CreatePage: NextPage = ({params} : any) => {
  const {title, subTitle} = params;
  const decodeTitle = decodeURI(title);
  const decodeSubTitle = decodeURI(subTitle);

  return (
    <CreateEditPageInner title={decodeTitle} subTitle={decodeSubTitle} />
  )
}

export default CreatePage