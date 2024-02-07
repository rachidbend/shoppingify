import { createContext, useContext } from 'react';
import { useGetAllItems } from '../Hooks/useGetAllItems';
import { useGetShoppingList } from '../Hooks/useGetShoppingList';
import { useUpdateShoppingList } from '../Hooks/useUpdateShoppingList';

/* 
The reason I created this context is to be able to get the item data and the list data to be able to add an item into the shopping list
*/
// Context for managing application-wide data
const AppContext = createContext();

// Provider component for managing application-wide data.
export default function AppProvider({ children }) {
  // Fetching all items data
  const {
    items,
    isLoading: isLoadingAllItems,
    error: allItemsError,
  } = useGetAllItems();

  // Fetching shopping list data
  const {
    shoppingList,
    isLoading: isLoadingShoppingList,
    error: shoppingListError,
  } = useGetShoppingList();

  // Custom hook to update the shopping list
  const { updateShoppingList } = useUpdateShoppingList();

  // Function to add an item to the shopping list.
  // This function is called when the user clicks the plus icon to add an item
  function addItemToList(item) {
    // Ensure that both the shopping list and all items data are loaded
    if (isLoadingShoppingList || isLoadingAllItems) return;

    // Update the shopping list with the new item
    updateShoppingList({
      id: shoppingList.id,
      item: item,
      oldList: shoppingList.items,
      shoppingList: shoppingList,
    });
  }

  // Value provided by the context
  const contexValue = {
    items,
    isLoadingAllItems,
    allItemsError,
    shoppingList,
    isLoadingShoppingList,
    shoppingListError,
    addItemToList,
  };

  return (
    <AppContext.Provider value={contexValue}>{children}</AppContext.Provider>
  );
}

// Custom hook to easily access the application-wide data provided by AppProvider.
export function useGetAppData() {
  const value = useContext(AppContext);

  // Throw an error if the hook is used outside of the AppProvider
  if (value === undefined)
    throw new Error(
      'The SidePageContext was used outside the SidePageProvider'
    );

  return value;
}
