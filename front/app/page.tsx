
import { Metadata } from "next";
import HomePageInner from "../src/app/HomePageInner";

export const metadata: Metadata = {
  title: 'K : Log',
  description:"K:Log에 있는 모든 게시물을 한번에 볼 수 있어요!"
}

const Home = () => {
  return (
    <HomePageInner/>
  )
}


export default Home

