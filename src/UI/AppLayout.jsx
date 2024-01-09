import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import NavSideBar from './NavSideBar';
import ShoppingList from './ShoppingList';

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
  return (
    <StyledAppLayout>
      <NavSideBar />
      <Outlet />
      <ShoppingList />
    </StyledAppLayout>
  );
}

export default AppLayout;
