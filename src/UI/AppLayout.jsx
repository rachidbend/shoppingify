import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import NavSideBar from './NavSideBar';
import ShoppingList from '../Features/shoppingList/ShoppingList';

// import AddNewItem from '../Features/addNewItem/AddNewItem';
import { useSidePage } from '../Context/SidePageProvider';
import AddNewItem from '../Features/addNewItem/AddNewItem';
import { AnimatePresence, motion } from 'framer-motion';
// import { createContext, useContext } from 'react';
// import { useGetAllItems } from '../Hooks/useGetAllItems';
// import { useGetShoppingList } from '../Hooks/useGetShoppingList';
// import { useUpdateShoppingList } from '../Hooks/useUpdateShoppingList';

const StyledAppLayout = styled(motion.div)`
  display: grid;
  grid-template-columns: 9.3915rem 1fr 38.9rem;
  height: 100vh;
  width: 100%;
  overflow: hidden;

  font-family: var(--font-main);
  background-color: var(--color-background);
`;

function AppLayout() {
  const { page, handleChangePage } = useSidePage();

  return (
    <StyledAppLayout>
      <NavSideBar />
      <Outlet />

      {/* <AnimatePresence> */}
      {page === 'shopping-list' && (
        <ShoppingList
          key={'component-shopping-list'}
          onchangePage={goTo => handleChangePage(goTo)}
        />
      )}
      {page === 'add-new-item' && (
        <AddNewItem
          key={'component-add-new-item'}
          onchangePage={goTo => handleChangePage(goTo)}
        />
      )}
      {/* </AnimatePresence> */}
    </StyledAppLayout>
  );
}

export default AppLayout;
