import { createContext, useContext, useState } from 'react';

const SidePageContext = createContext();

function SidePageProvider({ children }) {
  const [page, setPage] = useState('shopping-list');
  // available pages: shopping-list, add-new-item, item-details

  function handleChangePage(goTo) {
    if (goTo === 'shopping-list') setPage('shopping-list');
    if (goTo === 'add-new-item') setPage('add-new-item');
    if (goTo === 'item-details') setPage('item-details');
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

function useSidePage() {
  const value = useContext(SidePageContext);
  if (value === undefined)
    throw new Error(
      'The SidePageContext was used outside the SidePageProvider  '
    );

  return value;
}

export { SidePageProvider, useSidePage };
