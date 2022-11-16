import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'styled-components';

const darkTheme = {
  textColor: 'whitesmoke',
  backgroundColor: '#111',
};
// 스위치로 위아래 변환할꺼기 때문에 CSS 속성 같은거 사용
const lightTheme = {
  textColor: '#111',
  backgroundColor: 'whitesmoke',
};
// 큰 회사면 textColor, borderColor, linkColor, linkHoverColor 등등 다양
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
