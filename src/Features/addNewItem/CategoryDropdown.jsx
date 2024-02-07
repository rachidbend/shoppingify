/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { useState } from 'react';
import { useGetCategories } from '../../Hooks/useGetCategories';
import toast from 'react-hot-toast';
import Spinner from '../../UI/Spinner';

const CategorySelectBox = styled.div`
  position: relative;
`;

const Select = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-title);
  background-color: transparent;
  border-radius: 1.2rem;
  border: 0.2rem solid
    ${props =>
      props.isopen === 'true'
        ? 'var(--color-accent)'
        : 'var(--color-grey-200)'};
  padding: 2.16rem 1.76rem;
  outline: none;

  &:focus,
  &:hover,
  &:active {
    border: 0.2rem solid var(--color-accent);
  }
`;

const CategoryPlaceHolder = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-200);
`;

const CloseIconContainer = styled.div`
  display: inline-block;
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
`;

const CloseIcon = styled(MdClose)`
  width: 2.4rem;
  height: 2.4rem;
  color: var(--color-grey-400);
  cursor: pointer;
`;

const OptionsContainer = styled.div`
  padding: 1.24rem 0.73rem 1.12rem 0.82rem;
  background-color: var(--color-white);
  border-radius: 1.2rem;
  border: 1px solid var(--color-grey-600);
  box-shadow: var(--shadow-100);
  position: absolute;
  top: calc(100% + 1.22rem);
  left: 0;
  right: 0;
  z-index: 9999;
`;

const List = styled.ul``;
const Option = styled.li`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-title);
  padding: 1.13rem 2.28rem 1.25rem 2.28rem;
  margin-bottom: 0.22rem;
  list-style: none;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    border-radius: 1.2rem;
    background-color: #f2f2f2;
  }
`;

// Component responsible for rendering a dropdown menu for the available categories categories
function CategoryDropdown({ selectedCategory, onSelectCategory }) {
  // State to track the open/close state of the dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState();

  const { categories, isLoadingCategories, errorCategories } =
    useGetCategories();

  // Function to handle toggling the dropdown open/close state
  function toggleDropdown() {
    setIsDropdownOpen(isDropdownOpen => !isDropdownOpen);
  }

  // Function to handle resetting the selected category and closing the dropdown
  function handleReset() {
    // reset the selected category
    onSelectCategory('');
    // close the dropdown
    setIsDropdownOpen(false);
  }

  // Function to handle selecting a category
  function handleCategorySelect(category) {
    // set the seleceted category
    onSelectCategory(category);
    // close the dropdown
    setIsDropdownOpen(false);
  }

  // Render loading spinner if categories are still loading
  if (isLoadingCategories) return <Spinner />;
  // Display error message if there's an error fetching categories
  if (errorCategories) toast.error(errorCategories.message);

  return (
    <CategorySelectBox>
      {/* Dropdown toggle button */}
      <Select
        role="select"
        isopen={isDropdownOpen ? 'true' : 'false'}
        onClick={toggleDropdown}
      >
        {/* Display the selected category or placeholder text */}
        {selectedCategory ? (
          selectedCategory
        ) : (
          <CategoryPlaceHolder>Enter a category</CategoryPlaceHolder>
        )}
        {/* Button to reset the selected category */}
        <CloseIconContainer onClick={handleReset}>
          <CloseIcon />
        </CloseIconContainer>
      </Select>
      {/* Dropdown options */}
      {isDropdownOpen && (
        <OptionsContainer>
          <List>
            {/* Render dropdown options for each category */}
            {categories.map(category => (
              <Option
                onClick={() => handleCategorySelect(category.name)}
                value={category.name}
                key={`category-item-${category.id}`}
              >
                {category.name}
              </Option>
            ))}
          </List>
        </OptionsContainer>
      )}
    </CategorySelectBox>
  );
}

export default CategoryDropdown;
