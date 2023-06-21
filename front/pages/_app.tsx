import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import { theme } from '@styles/theme';
import { GlobalStyle } from '@styles/global-style';
import Layout from '@components/layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
