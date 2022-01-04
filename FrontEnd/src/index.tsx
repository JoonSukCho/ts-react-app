import React from 'react';
import ReactDOM from 'react-dom';

import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import GlobalStyle from 'styles/globalStyle';

import 'dotenv/config';
import App from 'App';

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#3182f6',
    },
  },
  typography: {
    fontFamily: [
      'Spoqa Han Sans Neo',
      '"Segoe UI"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: false, // 자동으로 쿼리의 요청 함수가 호출되도록 한다. (useEffect 처럼)
      // refetchOnMount: false, // 컴포넌트가 mount 될 때마다 요청 x
      refetchOnWindowFocus: false, // 화면이 focus 될 때마다 요청 x
      onSuccess: (data) => {
        // Add Todo
      },
      onError: (err) => {
        // Add Todo
      },
    },
  },
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <GlobalStyle />
      <ThemeProvider theme={customTheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
    <ReactQueryDevtools />
  </QueryClientProvider>,
  document.getElementById('root'),
);
