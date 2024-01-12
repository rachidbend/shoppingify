import { BrowserRouter } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';
import RoutesWithAnimation from './UI/RoutesWithAnimation';
import { createGlobalStyle } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SidePageProvider } from './Context/SidePageProvider';

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

    --color-accent: #f9a109;

    --color-red: #eb5757;
    --color-shopping-add-item-background: #80485b;

    --color-title: #34333a;

    /* background: #FAFAFE

sidebar nav background: #FFF
hsl(240, 2%, 76%)
accent color :#F9A109
hsl(249, 6%, 21% )
main text color: #000

input placeholder color : #BDBDBD

input border color: #BDBDBD

title main color #34333A:

white text : #FFF

shopping list category text color: #828282

shopping list background: #FFF0DE

shopping list add item background color :#80485B

history list completed : #56CCF2

history list cancelled : #EB5757

history date color : #C1C1C4 */
  }
`;

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <SidePageProvider>
        <BrowserRouter>
          <GlobalStyle />
          <AnimatePresence>
            <RoutesWithAnimation />
          </AnimatePresence>
        </BrowserRouter>
      </SidePageProvider>
    </QueryClientProvider>
  );
}

export default App;
