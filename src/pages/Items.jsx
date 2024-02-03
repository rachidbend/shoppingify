import { motion } from 'framer-motion';
import styled from 'styled-components';
import { childrenVariants, routeVariants } from '../Variables/variables';
import Item from '../UI/Item';
import { MdOutlineSearch } from 'react-icons/md';
import { useState } from 'react';
import { useGetAppData } from '../Context/AppContext';
import Spinner from '../UI/Spinner';
import { useUser } from '../Hooks/useUser';

// page container
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

  @media screen and (max-width: 780px) {
    padding: 0 2.4rem;
  }

  @media screen and (max-width: 480px) {
    padding: 0 1.24rem;
  }
`;
// animated all children in the page
const ChildrenContainer = styled(motion.div)``;

// HEADER CONTAINER
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }

  @media screen and (max-width: 780px) {
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
    /* margin-bottom: 1.8rem; */
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
    margin-top: 0;
    margin-bottom: 3.6rem;
  }

  @media screen and (max-width: 780px) {
    margin-top: 0;
    margin-bottom: 3.6rem;
  }

  @media screen and (max-width: 480px) {
    /* margin-top: 0rem; */
    margin-top: 3.77rem;
    margin-bottom: 3.6rem;
  }
`;

const SearchInput = styled.input`
  width: 27.5608rem;
  height: 5.0916rem;

  display: inline-block;

  border: none;
  border-radius: 1.2rem;
  background-color: var(--color-white);
  outline: 1px solid transparent;

  font-size: 1.4rem;
  font-weight: 500;

  padding-left: 6.17rem;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.04);

  transition: outline 260ms ease-in-out;
  &::placeholder {
    color: #bdbdbd;
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
  color: var(--color-gray-100);
  position: absolute;
  height: 2.6rem;
  width: 2.6rem;

  top: 1.33rem;
  left: 1.61rem;

  &:focus {
    border: 1px solid var(--color-accent);
  }
`;

// Category
const CategoryTitle = styled.h2`
  color: var(--color-black);
  margin-bottom: 1.8rem;
  font-size: 1.8rem;
  font-weight: 500;
`;

const CategoryContainer = styled.div`
  margin-bottom: 4.6rem;
  @media screen and (max-width: 480px) {
    margin-bottom: 2.71rem;
  }
`;
const CategoryItemsContianer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1.96rem;
  flex-grow: 0;
  flex-shrink: 0;
  @media screen and (max-width: 480px) {
    gap: 0.86rem;
    row-gap: 2.4rem;
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
  // const { items, isLoading, error } = useGetAllItems();
  const { items, isLoadingAllItems, allItemsError, addItemToList } =
    useGetAppData();

  if (isLoadingAllItems) return <Spinner />;
  if (allItemsError) return <p>{allItemsError.message}</p>;

  // filtering for the query
  // if there is no search query, return all the items
  // if there is a search query, return the items that have the query in their name
  const filteredItems =
    search === ''
      ? items
      : items.filter(item =>
          item.name.toLowerCase().includes(search.toLocaleLowerCase())
        );

  //  chat gpt's help //////
  // get all the available item categories without duplicates
  const availableCategories = filteredItems?.reduce(
    (accumulator, currentObject) => {
      const { category } = currentObject;

      // Check if the category is already a key in the accumulator
      if (!accumulator[category]) {
        accumulator[category] = [];
      }

      // Push the current object to the array corresponding to the category
      accumulator[category].push(currentObject);

      return accumulator;
    },
    {}
  );

  return (
    <StyledItems variants={routeVariants} initial="initial" animate="final">
      <ChildrenContainer
        variants={childrenVariants}
        initial="initial"
        animate="final"
        exit={{ opacity: 0, y: '30px' }}
      >
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
          <CategoryContainer key={key}>
            <CategoryTitle>{key}</CategoryTitle>
            <CategoryItemsContianer>
              {availableCategories[key].map(item => {
                return (
                  <Item
                    onAddItem={addItemToList}
                    itemDetails={item}
                    key={item.id}
                  />
                );
              })}
            </CategoryItemsContianer>
          </CategoryContainer>
        ))}
      </ChildrenContainer>
    </StyledItems>
  );
}

export default Items;
