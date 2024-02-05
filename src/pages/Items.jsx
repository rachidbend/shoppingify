import { motion } from 'framer-motion';
import styled from 'styled-components';
import Item from '../UI/Item';
import { MdOutlineSearch } from 'react-icons/md';
import { useState } from 'react';
import { useGetAppData } from '../Context/AppContext';
import Spinner from '../UI/Spinner';
import toast from 'react-hot-toast';
import { groupByProperty } from '../helpers/helperFunctions';
import ItemsCategory from '../UI/ItemsCategory';

// Page Container
const StyledItems = styled(motion.div)`
  padding: 0 8rem;
  overflow-y: scroll;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  @media screen and (min-width: 1600px) {
    padding: 0 14rem;
  }

  @media screen and (max-width: 1024px) {
    padding: 0 2.4rem;
  }

  @media screen and (max-width: 480px) {
    padding: 0 1.24rem;
  }
`;

// Animated all children in the page
const ChildrenContainer = styled(motion.div)``;

// Header Container
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }

  @media screen and (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

// Title text
const Title = styled.h1`
  color: var(--color-title);
  font-size: 2.6rem;
  font-weight: 500;
  margin-bottom: 5.71rem;
  margin-top: 3.75rem;

  @media screen and (max-width: 1200px) {
    padding-right: 8rem;
    margin-bottom: 2.8rem;
    margin-top: 3.7rem;
  }

  @media screen and (max-width: 780px) {
    font-size: 2.2rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 5.71rem;
    margin-top: 0rem;
    display: none;
  }
`;

const TitleAccent = styled.span`
  color: var(--color-accent);
  font-weight: 700;
`;

// Search Input
const SearchInputContainer = styled.div`
  position: relative;
  height: auto;
  margin-top: 2.77rem;

  @media screen and (max-width: 1200px) {
    margin: 0 0 3.6rem 0;
  }

  @media screen and (max-width: 780px) {
    margin: 0 0 3.6rem 0;
  }

  @media screen and (max-width: 480px) {
    margin: 3.77rem 0 3.6rem 0;
  }
`;

const SearchInput = styled.input`
  display: inline-block;
  width: 27.5608rem;
  height: 5.0916rem;
  font-size: 1.4rem;
  border: none;
  font-weight: 500;
  border-radius: 1.2rem;
  padding-left: 6.17rem;
  background-color: var(--color-white);
  outline: 1px solid transparent;
  box-shadow: var(--shadow-100);

  &::placeholder {
    color: var(--color-grey-200);
    font-family: var(--font-main);
  }
  &:focus {
    outline: 1px solid var(--color-accent);
  }

  @media screen and (max-width: 480px) {
    width: 22rem;
    padding-left: 5rem;
  }
`;

const SearchIcon = styled(MdOutlineSearch)`
  height: 2.6rem;
  width: 2.6rem;
  position: absolute;
  top: 1.33rem;
  left: 1.61rem;
  color: var(--color-grey-100);
  &:focus {
    border: 0.1rem solid var(--color-accent);
  }
`;

function Items() {
  // search input state
  const [search, setSearch] = useState('');

  // handler when the user inputs a search query
  function handleSearch(e) {
    if (!e) return;
    setSearch(e.target.value);
  }

  // all the items data
  const { items, isLoadingAllItems, allItemsError, addItemToList } =
    useGetAppData();

  if (isLoadingAllItems) return <Spinner />;
  if (allItemsError) toast.error(allItemsError.message);
  // filtering for the query
  // if there is no search query, return all the items
  // if there is a search query, return the items that have the query in their name
  const filteredItems =
    search === ''
      ? items
      : items.filter(item =>
          item.name.toLowerCase().includes(search.toLocaleLowerCase())
        );

  const availableCategories = groupByProperty(filteredItems, 'category');

  return (
    <StyledItems>
      <ChildrenContainer>
        <HeaderContainer>
          <Title>
            <TitleAccent>Shoppingify </TitleAccent>
            allows you take your shopping list wherever you go
          </Title>
          <SearchInputContainer>
            <SearchInput
              value={search}
              onChange={handleSearch}
              placeholder="search item"
            />
            <SearchIcon />
          </SearchInputContainer>
        </HeaderContainer>

        {Object.keys(availableCategories)?.map(key => (
          <ItemsCategory key={key}>
            <ItemsCategory.Title>{key}</ItemsCategory.Title>
            <ItemsCategory.Container>
              {availableCategories[key].map(item => {
                return (
                  <Item
                    onAddItem={addItemToList}
                    itemDetails={item}
                    key={item.id}
                  />
                );
              })}
            </ItemsCategory.Container>
          </ItemsCategory>
        ))}
      </ChildrenContainer>
    </StyledItems>
  );
}

export default Items;
