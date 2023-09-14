import type { Metadata, NextPage, ResolvingMetadata } from 'next';
import SubTitlePageInner from '@/src/app/category/title/subTitle/SubTitlePageInner';
import customApi from '@/src/utils/customApi';
import { notFound } from 'next/navigation';
import { replaceDash } from '@/src/utils/replaceSlash';

export interface CategoryPageProps {
  [key: string]: string;
}

export const generateMetadata = async ({ params: { title, subTitle } }: { params: CategoryPageProps }, parent: ResolvingMetadata): Promise<Metadata> => {
  try {
    const decodeTitle = decodeURI(title);
    const decodeSubTitle = replaceDash(decodeURI(subTitle));
    const { getApi } = customApi(`/category/getSubCategory/${decodeTitle}`);
    const data = await getApi();
    const checkSubTitleInData = data.subCategories.find((x: { categorySubTitle: string }) => x.categorySubTitle === decodeSubTitle);
    if (!checkSubTitleInData) {
      notFound();
    }
    return {
      title: decodeSubTitle + ' | K : Log',
      description: decodeSubTitle + '에 관한 게시물을 확인해 보세요!'
    };
  } catch (e) {
    notFound();
  }
};

const SubCategoryPage: NextPage = ({ params }: any) => {
  const { title, subTitle } = params;
  const decodeTitle = replaceDash(decodeURI(title));
  const decodeSubTitle = replaceDash(decodeURI(subTitle));

  return <SubTitlePageInner title={decodeTitle} subTitle={decodeSubTitle} />;
};

export default SubCategoryPage;
