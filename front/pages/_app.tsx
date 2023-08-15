import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import { theme } from '@styles/theme';
import { GlobalStyle } from '@styles/global-style';
import Layout from '@components/layout/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import CustomSeo from '@utils/Seo/CustomSeo';
import React, { useEffect } from 'react';
import customApi, { baseApi } from '@utils/customApi';
const queryClient = new QueryClient({});

const TOKEN_REFRESH_INTERVAL = 5 * 60 * 1000;

interface CustomAppProps extends AppProps {
  refresh_token: string;
  hasAccessToken: boolean;
}

const MyApp = ({ Component, pageProps, refresh_token, hasAccessToken }: CustomAppProps) => {
  /* const getNewAccessTokenByrefreshToken = async () => {
    try {
      // 현재 시간과 토큰의 만료 시간을 비교하여 갱신 여부 결정
      const tokenExpiration = sessionStorage.getItem('access_token_expiration'); // 세션 스토리지에 저장된 토큰 만료 시간
      const currentTime = new Date().getTime();
      const expirationTime = parseInt(tokenExpiration!, 10);
      if (expirationTime && expirationTime - currentTime < TOKEN_REFRESH_INTERVAL) {
        // 만료 시간이 일정 시간(5분) 미만으로 남았을 때 토큰 갱신
        const response = await baseApi().post('/auth/refresh', { refresh_token });
        const newAccessToken = response.data.newAccessToken;
        // 새로운 엑세스 토큰과 유효기간 세션 스토리지에 저장
        sessionStorage.setItem('access_token', newAccessToken);
        sessionStorage.setItem('access_token_expiration', `${new Date().getTime() + process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRATION!}`);
      }
    } catch (error) {
      console.error('토큰 갱신 실패:', error);
    }
  };
  const checkAccessToken = async () => {
    if (Boolean(refresh_token) && !hasAccessToken) {
      try {
        // 리프레시 토큰을 사용하여 새로운 엑세스 토큰을 발급받는 API 호출
        const response = await baseApi().post('/auth/refresh', { refresh_token });
        const newAccessToken = response.data.newAccessToken;
        sessionStorage.setItem('access_token', newAccessToken);
        // 새로운 엑세스 토큰을 반환
      } catch (error) {
        console.error('새로운 엑세스 토큰 발급 실패:', error);
      }
    }
  };
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (refresh_token) {
      checkAccessToken();
      getNewAccessTokenByrefreshToken();
      interval = setInterval(getNewAccessTokenByrefreshToken, 60 * 1000);
    }

    return () => clearInterval(interval);
  }, [refresh_token]);

  const { postApi: logoutApi } = customApi('/auth/cleanCookie');
  useEffect(() => {
    if (!sessionStorage.getItem('access_token')) {
      const logoutAsync = async () => {
        try {
          await logoutApi({});
        } catch (e) {
          console.log('Error logging out:', e);
        }
      };
      logoutAsync();
    }
  }, []); */

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Layout>
            <CustomSeo seoData={pageProps?.seoData ? pageProps.seoData : pageProps} />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </RecoilRoot>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
/* MyApp.getInitialProps = async (appContext: any) => {
  let hasAccessToken = false;
  let refresh_token;

  if (typeof window === 'undefined') {
    // 서버에서 실행 중인 경우에만 req 객체를 사용
    const cookies = appContext.ctx.req.headers.cookie || '';
    const cookieArray = cookies.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();

      if (cookie.startsWith('access_token=')) {
        hasAccessToken = true;
      }
      if (cookie.startsWith('refresh_token=')) {
        refresh_token = cookie.split('=')[1];
      }
    }
  }

  return { refresh_token, hasAccessToken };
}; */
export default MyApp;
