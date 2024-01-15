import { createContext, useContext } from 'react';
import { useGetAllItems } from '../Hooks/useGetAllItems';
import { useGetShoppingList } from '../Hooks/useGetShoppingList';
import { useUpdateShoppingList } from '../Hooks/useUpdateShoppingList';

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

  function addItemToList(item) {
    // id, newitem, oldList

    if (isLoadingShoppingList) return;
    if (isLoadingAllItems) return;
    updateShoppingList({
      id: shoppingList[0].id,
      item: item,
      oldList: shoppingList[0].items,
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

export function useGetAppData() {
  const value = useContext(AppContext);
  if (value === undefined)
    throw new Error(
      'The SidePageContext was used outside the SidePageProvider'
    );

  return value;
}
