import { Outlet, useParams } from 'react-router-dom';
import styled from 'styled-components';
import NavSideBar from './NavSideBar';
import ShoppingList from '../Features/shoppingList/ShoppingList';

import { useSidePage } from '../Context/SidePageProvider';
import AddNewItem from '../Features/addNewItem/AddNewItem';
import { motion } from 'framer-motion';
import ItemDetails from '../Features/itemDetails/ItemDetails';
import { useMobileSide } from '../Context/MobileSideContext';
import { Toaster } from 'react-hot-toast';

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

  /* for tablets nad mobile phones */
  @media screen and (max-width: 780px) {
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

// AppLayout component manages the overall layout of the application.
// It includes navigation, main content, side pages, and toast notifications.
function AppLayout() {
  // Get the current side page and its handler
  const { currentPage, handleChangePage } = useSidePage();
  // Get the item ID from URL parameters
  // If the user requests details of an item, an item id will be the the params
  const { itemId } = useParams();
  // Determine if the side menu is open and if the user is on a mobile device
  // The side page should be open or closed based on if a mobile device is used as well as user input
  const { isOpen, isMobile } = useMobileSide();

  return (
    <StyledAppLayout>
      {/* toast notifications is put on top to make sure it is visibale */}
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              fontSize: isMobile ? '1.2rem' : '1.6rem',
              fontFamily: 'var(--font-main)',
              fontWeight: 500,
            },
          },
          error: {
            duration: 5000,
          },
        }}
      />
      {/* Side navigation */}
      <NavSideBar />
      <Outlet />

      {/* Container for side pages */}
      <SideContainer
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        isopen={isOpen ? 'true' : isMobile ? 'false' : 'true'}
        ismobile={isMobile ? 'true' : 'false'}
      >
        {/* Render appropriate side page based on the current page and item ID */}
        {currentPage === 'shopping-list' && !itemId && (
          <ShoppingList key={'component-shopping-list'} />
        )}
        {currentPage === 'add-new-item' && !itemId && (
          <AddNewItem
            key={'component-add-new-item'}
            onchangePage={goTo => handleChangePage(goTo)}
          />
        )}
        {itemId && <ItemDetails />}
      </SideContainer>
    </StyledAppLayout>
  );
}

export default AppLayout;
