import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import NavSideBar from './NavSideBar';
import ShoppingList from '../Features/shoppingList/ShoppingList';

import AddNewItem from '../Features/addNewItem/AddNewItem';
import { useSidePage } from '../Context/SidePageProvider';
import { createContext, useContext } from 'react';
import { useGetAllItems } from '../Hooks/useGetAllItems';
import { useGetShoppingList } from '../Hooks/useGetShoppingList';
import { useUpdateShoppingList } from '../Hooks/useUpdateShoppingList';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 9.3915rem 1fr 38.9rem;
  height: 100vh;
  width: 100%;
  overflow-y: hidden;

  font-family: var(--font-main);
  background-color: var(--color-background);
`;

const AppContext = createContext();

function AppLayout() {
  const { page, handleChangePage } = useSidePage();
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
      <StyledAppLayout>
        <NavSideBar />
        <Outlet />

        {page === 'shopping-list' && (
          <ShoppingList onchangePage={goTo => handleChangePage(goTo)} />
        )}
        {page === 'add-new-item' && (
          <AddNewItem onchangePage={goTo => handleChangePage(goTo)} />
        )}
      </StyledAppLayout>
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

export default AppLayout;
