import { Header } from '@components/header/Header';
import type { NextPage } from 'next';
import { userInfomation } from '@atoms/atoms';
import { useRecoilState } from 'recoil';

const Home: NextPage = () => {
  const [user, setUser] = useRecoilState(userInfomation);
  console.log(user);
  return <div></div>;
};

export default Home;
