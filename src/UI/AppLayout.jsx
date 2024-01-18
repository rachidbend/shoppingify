import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import NavSideBar from './NavSideBar';
import ShoppingList from '../Features/shoppingList/ShoppingList';

// import AddNewItem from '../Features/addNewItem/AddNewItem';
import { useSidePage } from '../Context/SidePageProvider';
import AddNewItem from '../Features/addNewItem/AddNewItem';
// import { createContext, useContext } from 'react';
// import { useGetAllItems } from '../Hooks/useGetAllItems';
// import { useGetShoppingList } from '../Hooks/useGetShoppingList';
// import { useUpdateShoppingList } from '../Hooks/useUpdateShoppingList';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 9.3915rem 1fr 38.9rem;
  height: 100vh;
  width: 100%;
  overflow-y: hidden;

  font-family: var(--font-main);
  background-color: var(--color-background);
`;

function AppLayout() {
  // const { page, handleChangePage } = useSidePage();

  return (
    <StyledAppLayout>
      <NavSideBar />
      <Outlet />

      {/* {page === 'shopping-list' && (
            <ShoppingList onchangePage={goTo => handleChangePage(goTo)} />
          )} */}
      {/* <ShoppingList onchangePage={goTo => handleChangePage(goTo)} /> */}
      <AddNewItem />
      {/* <ShoppingList /> */}
      {/* {page === 'add-new-item' && (
            <AddNewItem onchangePage={goTo => handleChangePage(goTo)} />
          )} */}
    </StyledAppLayout>
  );
}

export default AppLayout;
