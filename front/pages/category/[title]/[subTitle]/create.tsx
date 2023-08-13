import BoardForm from '@components/board/subTitlePage/BoardForm';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useIsMount from 'src/hooks/useIsMount';
import styled, { keyframes } from 'styled-components';
import { BoardTitleBox } from '@components/board/BoardWrapComp';
import night_BG from '@assets/images/dark_night.jpg';
import { GetServerSideProps } from 'next';
import { CategoryPageProps } from '.';
import withGetServerSideProps from '@utils/Seo/withGetServerSideProps';
import customApi from '@utils/customApi';

const CreatePage = ({ title, subTitle }: CategoryPageProps) => {
  const { isMount } = useIsMount();
  const [currentTitle, setCurrentTitle] = useState<string[]>([]);

  useEffect(() => {
    setCurrentTitle([title, subTitle]);
  }, [title, subTitle]);
  return (
    <CreateWrap>
      <CreateContainer>
        <BoardTitleBox>{currentTitle && currentTitle.map((ele, idx) => <p key={ele + 'salt' + idx}>{ele}</p>)}</BoardTitleBox>
        <BoardForm subTitle={subTitle} />
      </CreateContainer>
    </CreateWrap>
  );
};
export const getServerSideProps: GetServerSideProps = withGetServerSideProps(async (context) => {
  const { query } = context;
  const { title, subTitle } = query;
  try{
    const { getApi } = customApi(`/category/getSubCategory/${title}`);
    const data = await getApi();
    const checkSubTitleInData = data.subCategories.find((x : {categorySubTitle : string}) => x.categorySubTitle === String(subTitle)?.replaceAll('-', '/'));
    if(!checkSubTitleInData){
      return{
        props:{},
        notFound : true
      }
    }
    return {
      props: { title: String(title)?.replaceAll('-', '/'), subTitle: String(subTitle)?.replaceAll('-', '/') }
    };
    }catch(e){
      return{
        props:{},
        notFound : true
      }
    }
});
export default CreatePage;

export const CreateWrap = styled.div`
  padding: 0 50px;
  background: linear-gradient(to right, rgba(11, 11, 22, 0.8) 100%, rgba(11, 11, 22, 0.8) 100%), url(${night_BG.src}) no-repeat center center/cover fixed;
  @media (max-width: 1200px) {
    padding: 0;
  }
`;
export const CreateContainer = styled.div`
  width: 100%;
  max-width: 1030px;
  padding: 0 50px 150px;
  margin: 0 auto;
  background: #23262d;
  @media (max-width: 937px) {
    padding: 0 10px 150px;
  }
`;
