"use client";

import StyledComponentsRegistry from '@/lib/styled-componets'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { theme } from '@/src/styles/theme';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import Layout from '@/src/components/layout/Layout';
import { GlobalStyle } from '@/src/styles/global-style';



const RootLayout = ({
  children,
}: {
  children: React.ReactNode,
}) => {

  const queryClient = new QueryClient();

  return (
    <html lang="ko">
      <body suppressHydrationWarning={true}>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <StyledComponentsRegistry>
              <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Layout>
                  {children}
                </Layout>
              </ThemeProvider>
            </StyledComponentsRegistry>
          </RecoilRoot>
          <ReactQueryDevtools />
        </QueryClientProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  )
}
export default RootLayout