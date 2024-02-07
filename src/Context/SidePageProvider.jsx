import { createContext, useContext, useState } from 'react';

// Context for managing side page state
const SidePageContext = createContext();

// Provider component for managing side page state.
export default function SidePageProvider({ children }) {
  // State to store the currently displayed page, defaults to 'shopping-list'
  const [currentPage, setPage] = useState('shopping-list');

  // Function to change the currently displayed page.
  function handleChangePage(goTo) {
    if (goTo === 'shopping-list') setPage('shopping-list');
    if (goTo === 'add-new-item') setPage('add-new-item');
  }

  return (
    <SidePageContext.Provider
      value={{
        currentPage,
        handleChangePage,
      }}
    >
      {children}
    </SidePageContext.Provider>
  );
}

// Custom hook to easily access the side page state provided by SidePageProvider.
export function useSidePage() {
  const value = useContext(SidePageContext);

  // Throw an error if the hook is used outside of the SidePageProvider
  if (value === undefined)
    throw new Error(
      'The SidePageContext was used outside the SidePageProvider  '
    );

  return value;
}
