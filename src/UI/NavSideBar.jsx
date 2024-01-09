import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavSideBar = styled.div`
  background-color: var(--color-nav-background);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6.1rem;
  font-size: 1.6rem;
`;
const StyledNavLink = styled(NavLink)``;

function NavSideBar() {
  return (
    <StyledNavSideBar>
      <StyledNavLink to="/items">Items</StyledNavLink>
      <StyledNavLink to="/history">History</StyledNavLink>
      <StyledNavLink to="/statistics">Statistics</StyledNavLink>
    </StyledNavSideBar>
  );
}

export default NavSideBar;
