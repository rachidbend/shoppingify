import { BrowserRouter } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';
import RoutesWithAnimation from './UI/RoutesWithAnimation';
import { createGlobalStyle } from 'styled-components';

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
    /* background: #FAFAFE

sidebar nav background: #FFF

accent color :#F9A109

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

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AnimatePresence>
        <RoutesWithAnimation />
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
