"use client";

import React from 'react'
import StyledComponentsRegistry from '@/lib/styled-componets'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { theme } from '@/src/styles/theme';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import Layout from '@/src/components/layout/Layout';
import { GlobalStyle } from '@/src/styles/global-style';

const InnerBody = (children : any) => {
  const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <StyledComponentsRegistry>
              <Layout>
                {children}
              </Layout>
            </StyledComponentsRegistry>
          </RecoilRoot>
          <ReactQueryDevtools />
        </QueryClientProvider>
  )
}

export default InnerBody