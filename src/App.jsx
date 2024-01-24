import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SidePageProvider } from './Context/SidePageProvider';
import AppProvider from './Context/AppContext';
import AppLayout from './UI/AppLayout';
import Items from './pages/Items';
import History from './pages/History';
import Statistics from './pages/Statistics';
import PageNotFound from './UI/PageNotFound';
import { AnimatePresence } from 'framer-motion';
import ItemDetails from './Features/itemDetails/ItemDetails';
import EmptyContainer from './UI/EmptyContainer';
import HistoryList from './UI/HistoryList';

/*
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/items',
        element: <Items />,
      },
      {
        path: '/history',
        element: <History />,
      },
      {
        path: '/statistics',
        element: <Statistics />,
      },
    ],
  },
]); 
*/

const styled = { createGlobalStyle };

export const GlobalStyle = styled.createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
  }
  :root {
    --font-main: 'Quicksand', sans-serif;

    --color-background: #fafafe;
    --color-nav-background: #fff;
    --color-shopping-list-background: #fff0de;

    --color-white: #fff;
    --color-black: #000;

    --color-gray-100: #454545;
    --color-gray-200: #bdbdbd;
    --color-gray-300: #c1c1c4;
    --color-gray-400: #828282;
    --color-gray-500: #c1c1c3;
    --color-gray-600: #e0e0e0;

    --color-accent: #f9a109;

    --color-red: #eb5757;
    --color-blue: #56ccf2;
    --color-shopping-add-item-background: #80485b;

    --color-title: #34333a;
  }
`;

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <BrowserRouter>
        <GlobalStyle />

        <AppProvider>
          <SidePageProvider>
            <AnimatePresence>
              <Routes location={location} key={location.key}>
                <Route element={<AppLayout />}>
                  <Route index path="/" element={<Navigate to={'/items'} />} />
                  <Route path="/items" element={<Items />}>
                    <Route path="/items/:itemId" element={<EmptyContainer />} />
                  </Route>
                  <Route path="/history" element={<History />} />
                  <Route path="/statistics" element={<Statistics />} />
                  <Route path="/history/:listId" element={<HistoryList />} />

                  <Route path="*" element={<PageNotFound />} />
                </Route>
              </Routes>
            </AnimatePresence>
          </SidePageProvider>
        </AppProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

// const queryClient = new QueryClient();

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ReactQueryDevtools />
//       <BrowserRouter>
//         <GlobalStyle />
//         <AnimatePresence>
//           <AppProvider>
//             <SidePageProvider>
//               <RoutesWithAnimation />
//             </SidePageProvider>
//           </AppProvider>
//         </AnimatePresence>
//       </BrowserRouter>
//     </QueryClientProvider>
//   );
// }

// export default App;
