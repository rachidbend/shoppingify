/* eslint-disable react/prop-types */
import styled from 'styled-components';

import illustration from './../../assets/source.svg';
import noItemsIllustration from '../../assets/undraw_shopping.svg';

import ShoppingItem from '../../UI/ShoppingItem';
import {
  childrenVariants,
  listChildrenVariants,
  routeVariants,
} from '../../Variables/variables';
import { motion } from 'framer-motion';
import { useGetAppData } from '../../Context/AppContext';
import { memo } from 'react';

const StyledShoppingList = styled(motion.div)`
  background-color: var(--color-shopping-list-background);
  /* padding: 4.37rem 3.19rem 4.37rem 4.84rem; */
  padding: 0;
  display: flex;
  /* padding-bottom: 13rem; */
  height: 100vh;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  overflow: hidden;
`;
// animated all children in the page
const ChildrenContainer = styled(motion.div)`
  padding-bottom: 13rem;
  padding: 4.37rem 3.19rem 0 4.84rem;
  height: 100vh;
  overflow: hidden;

  display: grid;
  grid-template-rows: auto auto 1fr auto;
`;

const AddItemContainer = styled.div`
  border-radius: 2.4rem;
  padding: 1.78rem 2.76rem 1.85rem 1.26rem;
  background-color: var(--color-shopping-add-item-background);
  /* display: flex; */
  position: relative;
`;

const AddItemParagraph = styled.p`
  color: var(--color-white);

  font-size: 1.6rem;
  margin-bottom: 1.36rem;
  font-weight: 700;
  margin-left: 10.95rem; /* 12.21rem - 1.26rem */
`;
const AddItemButton = styled.button`
  background-color: var(--color-white);
  color: var(--color-title);
  padding: 0.9rem 2.75rem;
  border: none;
  font-weight: 700;
  font-size: 1.4rem;
  border-radius: 1.2rem;
  cursor: pointer;
  margin-left: 10.95rem; /* 12.21rem - 1.26rem */
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.04);

  border: 0.1rem solid var(--color-white);

  transition: 260ms ease-in-out;

  &:hover {
    color: var(--color-white);
    background-color: transparent;
  }
`;

const AddItemIllustration = styled.img`
  position: absolute;
  height: 13.6rem;
  width: auto;
  top: -1.68rem;
`;

// Adding a name to the list
const NameInputContainer = styled.div`
  background-color: var(--color-white);
  padding: 3.49rem 3.96rem;
  position: fixed;
  bottom: 0;
  width: 38.9rem;

  /* margin: 0 -3.19rem 0 -4.84rem; */
`;

const NameInput = styled.input`
  border-radius: 1.2rem;
  border: 2px solid
    ${props =>
      props.disabled ? 'var(--color-gray-300)' : 'var(--color-accent)'};

  color: var(--color-title);
  padding: 0 1.76rem;
  height: 6.125rem;
  width: 100%;
  font-size: 1.4rem;
  font-weight: 500;
  font-family: var(--font-main);
  outline: none;
  cursor: ${props => (props.disabled ? 'no-drop' : 'pointer')};
`;
const SaveButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;

  background-color: ${props =>
    props.disabled ? 'var(--color-gray-300)' : 'var(--color-accent)'};
  border: none;
  padding: 0 2.42rem 0 2.52rem;
  height: 100%;

  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-white);
  border-radius: 1.2rem;
  cursor: ${props => (props.disabled ? 'no-drop' : 'pointer')};
  /* pointer no-drop  */
`;
const Container = styled.div`
  position: relative;
`;

// when there are no items
const NoItems = styled.p`
  color: var(--color-title);
  text-align: center;
  margin-top: 22.19rem;

  font-size: 2rem;

  font-weight: 700;
  margin-bottom: auto;
`;

const NoItemsIllustration = styled.img`
  position: absolute;
  top: -19.1rem;
`;

// Shopping list items
// title
const Title = styled.h2`
  color: var(--color-title);
  font-size: 2.4rem;
  font-weight: 700;
  margin-top: 4.4rem;
  margin-bottom: 3.93rem;
`;
// category container
const CategoryContainer = styled.div`
  margin-bottom: 5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;
// category title
const CategoryTitle = styled.h3`
  color: var(--color-gray-400);
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 1.68rem;
`;

const ShoppingListItemsContainer = styled(motion.div)`
  /* overflow-y: scroll;
  height: 60%; */
  height: 100%;
  overflow: scroll;
  padding-bottom: 13rem;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

const ShoppingListLoader = styled.div`
  height: 100%;
  width: 100%;
  /* background-color: var(--color-white); */
`;

const ShoppingList = memo(function ShoppingList({ onchangePage }) {
  // const { shoppingList, isLoading, error } = useGetShoppingList();
  const { shoppingList, isLoadingShoppingList, shoppingListError } =
    useGetAppData();

  if (isLoadingShoppingList)
    return <ShoppingListLoader>Loading </ShoppingListLoader>;
  if (shoppingListError) return <p>{shoppingListError.message} </p>;

  const emtyList =
    shoppingList[0].items === null ||
    shoppingList[0].length === 0 ||
    shoppingList[0].items === undefined;
  // console.log(shoppingList[0].length === 0);
  // console.log('emty list', emtyList);

  //  chat gpt's help //////
  // get all the available item categories without duplicates
  const availableCategories = emtyList
    ? []
    : shoppingList[0]?.items.reduce((accumulator, currentObject) => {
        const { category } = currentObject;

        // Check if the category is already a key in the accumulator
        if (!accumulator[category]) {
          accumulator[category] = [];
        }

        // Push the current object to the array corresponding to the category
        accumulator[category].push(currentObject);

        return accumulator;
      }, {});

  // ShoppingItem

  // variants={routeVariants}
  // initial="initial"
  // animate="final"

  // variants={listChildrenVariants}
  // initial="initial"
  // animate="final"

  return (
    <StyledShoppingList>
      <ChildrenContainer>
        <AddItemContainer>
          <AddItemIllustration src={illustration} />
          <div>
            <AddItemParagraph>Didn&apos;t find what you need?</AddItemParagraph>
            <AddItemButton onClick={() => onchangePage('add-new-item')}>
              Add item
            </AddItemButton>
          </div>
        </AddItemContainer>

        {emtyList && <NoItems>No items</NoItems>}
        {/* {!emtyList && } */}

        {!emtyList && (
          <>
            <Title>Shopping list</Title>
            <ShoppingListItemsContainer>
              {Object.keys(availableCategories).map(key => (
                <CategoryContainer key={`shopping list ${key}`}>
                  <CategoryTitle>{key} </CategoryTitle>
                  {availableCategories[key].map(item => (
                    <ShoppingItem item={item} />
                  ))}
                </CategoryContainer>
              ))}
            </ShoppingListItemsContainer>
          </>
        )}
        <NameInputContainer>
          {emtyList && <NoItemsIllustration src={noItemsIllustration} />}
          <Container>
            <NameInput
              disabled={emtyList}
              type="text"
              placeholder="Enter a name"
            />
            <SaveButton disabled={emtyList}>save</SaveButton>
          </Container>
        </NameInputContainer>
      </ChildrenContainer>
    </StyledShoppingList>
  );
});

export default ShoppingList;
