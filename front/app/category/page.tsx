import { Metadata } from 'next';
import CategoryPageInner from '../../src/app/category/CategoryPageInner';

const AllCategoryPage = () => {

  return (
    <CategoryPageInner/>
  );
};

export const metadata: Metadata = {
  title: '분류 전체보기 | K : Log',
  description:"K:Log에 있는 모든 게시물을 한번에 볼 수 있어요!"
}

export default AllCategoryPage;
