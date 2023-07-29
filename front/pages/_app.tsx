import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import { theme } from '@styles/theme';
import { GlobalStyle } from '@styles/global-style';
import Layout from '@components/layout/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import CustomSeo from '@utils/Seo/CustomSeo';

const queryClient = new QueryClient({});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { seoData } = pageProps;
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Layout>
            <CustomSeo seoData={seoData} />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </RecoilRoot>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default MyApp;
