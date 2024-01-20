import { Outlet, useParams } from 'react-router-dom';
import styled from 'styled-components';
import NavSideBar from './NavSideBar';
import ShoppingList from '../Features/shoppingList/ShoppingList';

// import AddNewItem from '../Features/addNewItem/AddNewItem';
import { useSidePage } from '../Context/SidePageProvider';
import AddNewItem from '../Features/addNewItem/AddNewItem';
import { AnimatePresence, motion } from 'framer-motion';
import ItemDetails from '../Features/itemDetails/ItemDetails';
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
  const { itemId } = useParams();

  return (
    <StyledAppLayout>
      <NavSideBar />
      <Outlet />

      {/* <AnimatePresence> */}
      {page === 'shopping-list' && !itemId && (
        <ShoppingList
          key={'component-shopping-list'}
          onchangePage={goTo => handleChangePage(goTo)}
        />
      )}
      {page === 'add-new-item' && !itemId && (
        <AddNewItem
          key={'component-add-new-item'}
          onchangePage={goTo => handleChangePage(goTo)}
        />
      )}
      {itemId && <ItemDetails />}
      {/* </AnimatePresence> */}
    </StyledAppLayout>
  );
}

export default AppLayout;
