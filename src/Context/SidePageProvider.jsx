import { createContext, useContext, useState } from 'react';
// side page context
const SidePageContext = createContext();

function SidePageProvider({ children }) {
  // storing the state of the page that will be displayed, and it starts as the shopping list by default
  const [page, setPage] = useState('shopping-list');

  // this changes the state to be the page that shoold be displayed
  function handleChangePage(goTo) {
    if (goTo === 'shopping-list') setPage('shopping-list');
    if (goTo === 'add-new-item') setPage('add-new-item');
  }

  return (
    <SidePageContext.Provider
      value={{
        page,
        handleChangePage,
      }}
    >
      {children}
    </SidePageContext.Provider>
  );
}

// custom hook to easily get the values of the context without needing to export the context itself
function useSidePage() {
  const value = useContext(SidePageContext);
  if (value === undefined)
    throw new Error(
      'The SidePageContext was used outside the SidePageProvider  '
    );

  return value;
}

export { SidePageProvider, useSidePage };
