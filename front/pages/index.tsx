import type { GetServerSideProps, NextPage } from 'next';
import Banner from '@components/banner/Banner';
import styled from 'styled-components';
import HomeContent from '@components/home/HomeContent';
import withGetServerSideProps from '@utils/Seo/withGetServerSideProps';

const Home: NextPage = () => {
  return (
    <HomeWrap>
      <Banner></Banner>
      <HomeContent></HomeContent>
    </HomeWrap>
  );
};
export const getServerSideProps: GetServerSideProps = withGetServerSideProps(async (context) => {
  return {
    props: {}
  };
});
export default Home;

const HomeWrap = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
`;
