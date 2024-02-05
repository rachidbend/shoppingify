import { createContext, useContext } from 'react';
import { useGetAllItems } from '../Hooks/useGetAllItems';
import { useGetShoppingList } from '../Hooks/useGetShoppingList';
import { useUpdateShoppingList } from '../Hooks/useUpdateShoppingList';
import { useUser } from '../Hooks/useUser';

/* 
The reason I created this context is to be able to get the item data and the list data to be able to add an item into the shopping list
*/
const AppContext = createContext();

export default function AppProvider({ children }) {
  const {
    items,
    isLoading: isLoadingAllItems,
    error: allItemsError,
  } = useGetAllItems();

  const {
    shoppingList,
    isLoading: isLoadingShoppingList,
    error: shoppingListError,
  } = useGetShoppingList();

  const {
    updateShoppingList,
    isLoading: isUpdatingShoppingList,
    error: updateSoppingListError,
  } = useUpdateShoppingList();

  const { user } = useUser();

  // This function gets an item and adds that items to the shopping list,
  // so whe nthe user clicks the plus icon to add an item, this function is called and it adds that item to the shopping list.
  function addItemToList(item) {
    // make sure the shopping list and all the items exist first
    if (isLoadingShoppingList || isLoadingAllItems) return;
    // then we can update without any missing data
    updateShoppingList({
      userId: user.id,
      id: shoppingList.id,
      item: item,
      oldList: shoppingList.items,
      shoppingList: shoppingList,
    });
  }

  return (
    <AppContext.Provider
      value={{
        items,
        isLoadingAllItems,
        allItemsError,
        shoppingList,
        isLoadingShoppingList,
        shoppingListError,
        addItemToList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// This custom hook gives easy access to the provided values
export function useGetAppData() {
  const value = useContext(AppContext);
  if (value === undefined)
    throw new Error(
      'The SidePageContext was used outside the SidePageProvider'
    );

  return value;
}
