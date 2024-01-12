/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useGetShoppingList } from '../../Hooks/useGetShoppingList';

import illustration from './../../assets/source.svg';
import noItemsIllustration from '../../assets/undraw_shopping.svg';

const StyledShoppingList = styled.div`
  background-color: var(--color-shopping-list-background);
  padding: 4.37rem 3.19rem 4.37rem 4.84rem;
  min-height: 100%;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  overflow-y: scroll;
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

  margin: 0 -3.19rem 0 -4.84rem;
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

function ShoppingList({ onchangePage }) {
  const { shoppingList, isLoading, error } = useGetShoppingList();

  if (isLoading) return <p>Loading </p>;
  if (error) return <p>{error.message} </p>;

  const emtyList =
    shoppingList.items === null ||
    shoppingList.length === 0 ||
    shoppingList.items === undefined;
  console.log(emtyList);
  return (
    <StyledShoppingList>
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
    </StyledShoppingList>
  );
}

export default ShoppingList;
