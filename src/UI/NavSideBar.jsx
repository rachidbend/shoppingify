/* eslint-disable react-hooks/exhaustive-deps */
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
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TbTriangleFilled } from 'react-icons/tb';

const StyledNavSideBar = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 5.25rem 0 3.49rem 0;
  background-color: var(--color-nav-background);

  @media screen and (max-width: 480px) {
    padding: 3.22rem 0 3.38rem 0;
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6.4rem;
  width: 100%;
  position: relative;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  position: relative;
  text-align: center;
`;

const StyledItemsIcon = styled(MdFormatListBulleted)`
  height: 2.6rem;
  width: 2.6rem;
  color: var(--color-grey-100);

  &:hover {
    color: var(--color-accent);
  }
`;

const StyledHistoryIcon = styled(MdOutlineReplay)`
  height: 2.6rem;
  width: 2.6rem;
  color: var(--color-grey-100);

  &:hover {
    color: var(--color-accent);
  }
`;

const StyledStatisticsIcon = styled(MdInsertChartOutlined)`
  height: 2.6rem;
  width: 2.6rem;
  color: var(--color-grey-100);

  &:hover {
    color: var(--color-accent);
  }
`;

const ShoppingCartContainer = styled.div`
  position: relative;
`;

const ShoppingCart = styled(MdOutlineShoppingCart)`
  width: 4.2rem;
  height: 4.2rem;
  color: var(--color-white);
  padding: 1.1rem;
  background-color: var(--color-accent);
  border-radius: 50%;
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

const SideSpan = styled(motion.span)`
  width: 0.6rem;
  height: 4.5981rem;
  background-color: var(--color-accent);
  border-radius: 0rem 0.4rem 0.4rem 0rem;
  position: absolute;
  top: 0;
  left: 0;
`;

const LinkHoverContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.1077rem;
  transform: translateY(-50%);
  padding: 0.3rem 1.68rem 0.34rem 1.68rem;
  background-color: var(--color-grey-100);
  border-radius: 0.4rem;
  position: absolute;
  left: 8rem;
  top: 50%;
`;

const LinkHoverText = styled.p`
  color: var(--color-white);
  font-size: 1.2rem;
  font-weight: 500;
`;

const LinkHoverSpan = styled(TbTriangleFilled)`
  width: 1.1445rem;
  height: 1.1445rem;
  transform: rotate(-90deg) translate(50%, -75%);
  color: var(--color-grey-100);
  position: absolute;
  top: 50%;
  left: 0;
`;

const adjustSpanPosition = (sideSpanRef, spanPosition, ref, position) => {
  // checks which route is active
  // then changes the position of the sideSpan based on it, and puts it in the middle
  if (ref.current.classList.contains('active')) {
    sideSpanRef.current.style.top = `${
      position.top + position.height / 2 - spanPosition.height / 2
    }px`;
  }
};

function NavSideBar() {
  // to make sure that when a link is hovered, we show the appropriate element
  const [linkHovered, setLinkHovered] = useState('');
  // this is used to display the number of items in the shopping list
  const { shoppingList, isLoading } = useGetShoppingList();
  // this opens and closes the side page on mobile view
  const { onOpenMobileSide } = useMobileSide();

  // grabbing all the elements needed
  const sideSpanRef = useRef();
  const accountRef = useRef();
  const itemsRef = useRef();
  const historyRef = useRef();
  const statisticsRef = useRef();
  // initiating the position of each element
  let spanPosition;
  let accountPosition;
  let itemsPosition;
  let historytPosition;
  let statisticsPosition;

  // this effect runs on every re-render to make sure the position of the span is always correct
  useEffect(function () {
    // guard check
    if (
      sideSpanRef?.current === undefined ||
      accountRef?.current === undefined ||
      itemsRef?.current == undefined ||
      historyRef?.current === undefined ||
      statisticsRef?.current === undefined
    )
      return;
    // getting the position of each element
    spanPosition = sideSpanRef?.current.getBoundingClientRect();
    accountPosition = accountRef?.current.getBoundingClientRect();
    itemsPosition = itemsRef?.current.getBoundingClientRect();
    historytPosition = historyRef?.current.getBoundingClientRect();
    statisticsPosition = statisticsRef?.current.getBoundingClientRect();

    // console.log(itemsRef.current.classList.contains('active'));
    // changing the position of the side span depending on which page is active
    // and putting it in the middle of the element, to look like they are aligned in the middle

    adjustSpanPosition(sideSpanRef, spanPosition, accountRef, accountPosition);
    adjustSpanPosition(sideSpanRef, spanPosition, itemsRef, itemsPosition);
    adjustSpanPosition(sideSpanRef, spanPosition, historyRef, historytPosition);
    adjustSpanPosition(
      sideSpanRef,
      spanPosition,
      statisticsRef,
      statisticsPosition
    );
  });

  function handleLinkHover(name) {
    setLinkHovered(name);
  }
  function handleLinkExit() {
    setLinkHovered('');
  }

  return (
    <StyledNavSideBar>
      <SideSpan layout ref={sideSpanRef}></SideSpan>
      <StyledNavLink
        onMouseEnter={() => handleLinkHover('account')}
        onMouseLeave={handleLinkExit}
        ref={accountRef}
        to="/account"
      >
        <Logo src={logo} alt="Shoppingify logo" />
        {linkHovered === 'account' && (
          <LinkHoverContainer>
            <LinkHoverSpan />
            <LinkHoverText>account</LinkHoverText>
          </LinkHoverContainer>
        )}
      </StyledNavLink>

      <NavContainer>
        <StyledNavLink
          onMouseEnter={() => handleLinkHover('items')}
          onMouseLeave={handleLinkExit}
          ref={itemsRef}
          to="/items"
        >
          <StyledItemsIcon />
          {linkHovered === 'items' && (
            <LinkHoverContainer>
              <LinkHoverSpan />
              <LinkHoverText>items</LinkHoverText>
            </LinkHoverContainer>
          )}
        </StyledNavLink>
        <StyledNavLink
          onMouseEnter={() => handleLinkHover('history')}
          onMouseLeave={handleLinkExit}
          ref={historyRef}
          to="/history"
        >
          <StyledHistoryIcon />
          {linkHovered === 'history' && (
            <LinkHoverContainer>
              <LinkHoverSpan />
              <LinkHoverText>history</LinkHoverText>
            </LinkHoverContainer>
          )}
        </StyledNavLink>
        <StyledNavLink
          onMouseEnter={() => handleLinkHover('statistics')}
          onMouseLeave={handleLinkExit}
          ref={statisticsRef}
          to="/statistics"
        >
          <StyledStatisticsIcon />
          {linkHovered === 'statistics' && (
            <LinkHoverContainer>
              <LinkHoverSpan />
              <LinkHoverText>statistics</LinkHoverText>
            </LinkHoverContainer>
          )}
        </StyledNavLink>
      </NavContainer>
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
