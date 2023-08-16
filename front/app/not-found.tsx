import { Metadata } from 'next';
import NotFoundInner from '@/src/app/NotFoundInner';


export const metadata: Metadata = {
  title: "Not-Found | K : Log",
  description:"존재하지 않는 페이지입니다."
}

const NotFoundPage = () => {
  return (
    <NotFoundInner/>
  )
}

export default NotFoundPage
