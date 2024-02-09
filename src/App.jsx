import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import SidePageProvider from './Context/SidePageProvider';
import AppProvider from './Context/AppContext';
import AppLayout from './UI/AppLayout';
import Items from './pages/Items';
import History from './pages/History';
import Statistics from './pages/Statistics';
import PageNotFound from './UI/PageNotFound';
import EmptyContainer from './UI/EmptyContainer';
import HistoryList from './UI/HistoryList';
import Login from './Features/authentication/Login';
import Signup from './Features/authentication/Signup';
import ProtectedRoute from './UI/ProtectedRoute';
import MobileSideProvider from './Context/MobileSideContext';
import Account from './pages/Account';
import ResetPassword from './pages/ResetPassword';
import GetEmail from './pages/GetEmail';
import EmailConfirmation from './UI/EmailConfirmation';
import CheckEmail from './UI/CheckEmail';

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
    /* main font familiy */
    --font-main: 'Quicksand', sans-serif;

    /* background colors */
    --color-background: #fafafe;
    --color-nav-background: #fff;
    --color-shopping-list-background: #fff0de;
    --color-shopping-add-item-background: #80485b;
    --color-backgound-modal-overlay: rgba(0, 0, 0, 0.1);

    /* main colors */
    --color-white: #fff;
    --color-black: #000;
    --color-accent: #f9a109;

    /* grey cloros */
    --color-title: #34333a;
    --color-grey-100: #454545;
    --color-grey-200: #bdbdbd;
    --color-grey-300: #c1c1c4;
    --color-grey-400: #828282;
    --color-grey-500: #c1c1c3;
    --color-grey-600: #e0e0e0;

    /* secondary colors */
    --color-red: #eb5757;
    --color-blue: #56ccf2;

    /* box shadows */
    --shadow-100: 0px 2px 12px 0px rgba(0, 0, 0, 0.04);

    --shadow-item: 0px 2px 12px 0px rgba(0, 0, 0, 0.05);
    --shadow-item-hover: 0px 4px 16px 0px rgba(0, 0, 0, 0.1);

    /* transitions */
    --transition-input: 0.3s cubic-bezier(0.17, 0.67, 0.9, 0.33);
    --transition-button: 0.3s cubic-bezier(0.17, 0.67, 0.35, 0.35);
    --transition-button-text: 0.3s ease;
  }
`;

/* The AppLayout is protected by the ProtectedRoute to prevent un autherized app use. 
  In turn the History, Items, Statistics, and Account pages are protected by the ProtectedRoute because they reside inside of AppLayout. 
  The sub-pages, which are item-details, shopping-list, history-list,and add-new-item, are protected aswell.
  The pages that are not protected, meaning any one can access them are, Login, Signup,ResetPassword, GetEmail, and EmailConfirmation.
*/

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <BrowserRouter>
        {/* app global styles */}
        <GlobalStyle />

        {/* the side page provider allows for navigation between the shopping list and item details */}
        <SidePageProvider>
          <AppProvider>
            {/* the Mobile provider allows for the app to find out if it is being displayed in a mobile device, so that the app can addapt how it shows the main and side pages like the shopping list.  */}
            <MobileSideProvider>
              <Routes location={location} key={location.key}>
                <Route
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  {/* these are the main routes */}
                  <Route index path="/" element={<Navigate to={'/items'} />} />
                  <Route key={'items-page'} path="/items" element={<Items />}>
                    <Route path="/items/:itemId" element={<EmptyContainer />} />
                  </Route>
                  <Route
                    key={'history-path'}
                    path="/history"
                    element={<History />}
                  />
                  <Route path="/statistics" element={<Statistics />} />
                  <Route path="/account" element={<Account />} />
                  {/* this shows the history list when a specific list is requested */}
                  <Route path="/history/:listId" element={<HistoryList />} />

                  <Route path="*" element={<PageNotFound />} />
                </Route>
                {/* these are the pages for logging in, signing up, reseting password, and confirming email on signup. */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/reset" element={<ResetPassword />} />
                <Route path="/get-email" element={<GetEmail />} />
                <Route path="/confirm" element={<EmailConfirmation />} />
                <Route path="/password-check" element={<CheckEmail />} />
              </Routes>
            </MobileSideProvider>
          </AppProvider>
        </SidePageProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
