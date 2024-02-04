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
import { Toaster } from 'react-hot-toast';
import Spinner from './Spinner';
import { useUser } from '../Hooks/useUser';

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

  @media screen and (max-width: 1024px) {
    grid-template-columns: 6.1581rem 1fr 32rem;
  }

  @media screen and (max-width: 780px) {
    grid-template-columns: 6.1581rem 1fr;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 6.1581rem 1fr;
  }
`;

const SideContainer = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: ${props => (props.ismobile === 'true' ? 'absolute' : 'static')};

  left: ${props => (props.isopen === 'true' ? '6.1581rem' : '100%')};
  top: 0;
  right: 0;

  transition: left 360ms cubic-bezier(0.215, 0.61, 0.355, 1),
    right 360ms cubic-bezier(0.215, 0.61, 0.355, 1);

  @media screen and (max-width: 1024px) {
    width: 100%;
    position: static;
  }

  @media screen and (max-width: 780px) {
    width: 38rem;
    left: auto;
    right: ${props => (props.isopen === 'true' ? '0' : '-100%')};
    position: ${props => (props.ismobile === 'true' ? 'absolute' : 'static')};
  }

  @media screen and (max-width: 480px) {
    width: calc(100% - 6.1581rem);
  }
`;

function AppLayout() {
  const { page, handleChangePage } = useSidePage();
  const { itemId } = useParams();
  const { isOpen } = useMobileSide();
  const isMobile = window.innerWidth <= 780;

  return (
    <StyledAppLayout>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              fontSize: '1.2rem',
              fontFamily: 'var(--font-main)',
              fontWeight: 500,
            },
          },
          error: {
            duration: 5000,
          },
        }}
      />
      <NavSideBar />
      <Outlet />

      {/* <AnimatePresence> */}
      <SideContainer
        isopen={isOpen ? 'true' : isMobile ? 'false' : 'true'}
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
