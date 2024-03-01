import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { SaasProvider } from '@saas-ui/react';
import { RandomNumbersContext } from '@/utilities/context';

import customTheme from '@theme/customTheme';
import router from './router';

import './index.css';

// const theme = extendTheme({
//   colors: {
//     hoverBg: {
//       200: '#292F36',
//     },
//     border: {
//       100: '#4a4f56',
//       200: '#383e44',
//       500: '#21262D',
//     },
//     tokenBg: {
//       200: '#31373D',
//       500: '#161B22',
//       700: '#0C1218',
//     },
//     subTextColor: {
//       200: '#B0BEC5',
//     },
//     linkTextColor: {
//       200: '#8ABFF5',
//     },
//   },
// });

const App = () => {
  const [attributeChanges, setAttributeChanges] = React.useState<{}>({});
  const [currentAttributes, setCurrentAttributes] = React.useState<{}>({});
  const [currentTab, setCurrentTab] = React.useState<number>(0);
  const context = useMemo(
    () => ({
      attributeChanges,
      setAttributeChanges,
      currentAttributes,
      setCurrentAttributes,
      currentTab,
      setCurrentTab,
    }),
    [attributeChanges, currentAttributes, currentTab],
  );
  return (
    <RandomNumbersContext.Provider value={context}>
      <RouterProvider router={router} />
    </RandomNumbersContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <SaasProvider>
        <App />
      </SaasProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
