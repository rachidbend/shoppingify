import { Outlet, useParams } from 'react-router-dom';
import styled from 'styled-components';
import NavSideBar from './NavSideBar';
import ShoppingList from '../Features/shoppingList/ShoppingList';

// import AddNewItem from '../Features/addNewItem/AddNewItem';
import { useSidePage } from '../Context/SidePageProvider';
import AddNewItem from '../Features/addNewItem/AddNewItem';
import { AnimatePresence, motion } from 'framer-motion';
import ItemDetails from '../Features/itemDetails/ItemDetails';
import { useMobileSide } from '../Context/MobileSideContext';
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
  position: relative;
  @media screen and (max-width: 480px) {
    grid-template-columns: 6.1581rem 1fr;
  }
`;

const SideContainer = styled.div`
  width: 100%;
  position: ${props => (props.ismobile === 'true' ? 'absolute' : 'static')};

  /* left: 6.1581rem; */
  left: ${props => (props.isopen === 'true' ? '6.1581rem' : '100%')};
  top: 0;
  right: 0;
`;

function AppLayout() {
  const { page, handleChangePage } = useSidePage();
  const { itemId } = useParams();
  const { isOpen } = useMobileSide();
  const isMobile = window.innerWidth <= 480;

  return (
    <StyledAppLayout>
      <NavSideBar />
      <Outlet />

      {/* <AnimatePresence> */}
      <SideContainer
        isopen={isOpen ? 'true' : 'false'}
        ismobile={isMobile ? 'true' : 'false'}
      >
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
      </SideContainer>
      {/* </AnimatePresence> */}
    </StyledAppLayout>
  );
}

export default AppLayout;
