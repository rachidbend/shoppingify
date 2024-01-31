import { NavLink } from 'react-router-dom';
import {
  MdFormatListBulleted,
  MdOutlineReplay,
  MdInsertChartOutlined,
  MdOutlineShoppingCart,
} from 'react-icons/md';
import logo from './../assets/logo.svg';

import styled from 'styled-components';
import { useGetShoppingList } from '../Hooks/useGetShoppingList';
import { useMobileSide } from '../Context/MobileSideContext';

const StyledNavSideBar = styled.div`
  background-color: var(--color-nav-background);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* gap: 6.1rem; */
  font-size: 1.6rem;

  padding-top: 5.25rem;
  padding-bottom: 3.49rem;
`;

const NavContianer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6.1rem;
`;
const StyledNavLink = styled(NavLink)`
  width: 100%;
  text-align: center;
  position: relative;
  transition: all 400ms ease-in-out;
  &.active {
    /* border-left: 3px solid var(--color-accent); */
    transition: all 400ms ease-in-out;
  }
  &:last-child::after {
    content: '';
    position: absolute;
    width: 0.6rem;
    height: 4.5981rem;
    background-color: var(--color-accent);
    left: 0;
    top: -1rem;
    border-radius: 0rem 0.4rem 0.4rem 0rem;
    transition: all 400ms ease-in-out;
  }

  &:nth-child(1).active ~ &:last-child::after {
    top: -19.4rem;
  }
  &:nth-child(2).active ~ &:last-child::after {
    top: -10.2rem;
  }
  &:nth-child(3).active ~ &:last-child::after {
    top: -1rem;
  }

  &::before {
    content: '';
    position: absolute;

    font-family: var(--font-main);
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--color-white);
    background-color: var(--color-gray-100);
    padding: 0.3rem 1.68rem;
    left: 8.06rem;
    top: 0.25rem;
    opacity: 0;
    border-radius: 0.4rem;
    transition: all 400ms ease-in-out;
  }
  &:nth-child(1)::before {
    content: 'items';
  }
  &:nth-child(2)::before {
    content: 'history';
  }
  &:nth-child(3)::before {
    content: 'statistics';
  }

  &:hover::before {
    opacity: 1;
  }
`;

const StyledItemsIcon = styled(MdFormatListBulleted)`
  color: var(--color-gray-100);
  height: 2.6rem;
  width: 2.6rem;

  transition: color 180ms ease-out;

  &:hover {
    color: var(--color-accent);
  }
`;
const StyledHistoryIcon = styled(MdOutlineReplay)`
  color: var(--color-gray-100);
  height: 2.6rem;
  width: 2.6rem;

  transition: color 180ms ease-out;

  &:hover {
    color: var(--color-accent);
  }
`;
const StyledStatisticsIcon = styled(MdInsertChartOutlined)`
  color: var(--color-gray-100);
  height: 2.6rem;
  width: 2.6rem;

  transition: color 180ms ease-out;

  &:hover {
    color: var(--color-accent);
  }
`;

const ShoppingCartContainer = styled.div`
  position: relative;
`;

const ShoppingCart = styled(MdOutlineShoppingCart)`
  color: var(--color-white);
  padding: 1.1rem;
  background-color: var(--color-accent);
  border-radius: 50%;
  width: 4.2rem;
  height: 4.2rem;
`;

const ShoppingCount = styled.span`
  position: absolute;
  top: -10%;
  right: -30%;

  color: var(--color-white);
  background-color: var(--color-red);

  font-size: 1.2rem;
  font-weight: 500;
  font-family: var(--font-main);

  padding: 0.25rem 0.96rem;
  border-radius: 0.4rem;
`;

const Logo = styled.img`
  width: 4.1688rem;
  height: 4.1828rem;
`;

function NavSideBar() {
  const { shoppingList, isLoading } = useGetShoppingList();
  const { onOpenMobileSide } = useMobileSide();
  return (
    <StyledNavSideBar>
      <Logo src={logo} alt="Shoppingify logo" />

      <NavContianer>
        <StyledNavLink to="/items">
          <StyledItemsIcon />
        </StyledNavLink>
        <StyledNavLink to="/history">
          <StyledHistoryIcon />
        </StyledNavLink>
        <StyledNavLink to="/statistics">
          <StyledStatisticsIcon />
        </StyledNavLink>
      </NavContianer>
      <ShoppingCartContainer onClick={onOpenMobileSide}>
        <ShoppingCart />
        <ShoppingCount>
          {isLoading
            ? 0
            : shoppingList?.items?.length === 0
            ? 0
            : shoppingList?.items?.length}
        </ShoppingCount>
      </ShoppingCartContainer>
    </StyledNavSideBar>
  );
}

export default NavSideBar;
