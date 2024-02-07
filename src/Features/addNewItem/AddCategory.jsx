/* eslint-disable react/prop-types */
import { useState } from 'react';
import styled from 'styled-components';
import { useAddCategory } from '../../Hooks/useAddCategory';

const AddCategoryContainer = styled.div`
  position: relative;
  margin-top: 2.4rem;
`;

const Input = styled.input`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-title);
  background-color: transparent;
  border-radius: 1.2rem;
  border: 0.2rem solid var(--color-grey-200);
  padding: 2.16rem 1.76rem;
  outline: none;
  &::placeholder {
    font-family: var(--font-main);
    color: var(--color-grey-200);
  }
  &:focus {
    border: 0.2rem solid var(--color-accent);
  }
`;

const AddCategoryInput = styled(Input)`
  width: 100%;
  padding-right: 9rem;
`;

const AddCategoryButton = styled.button`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-white);
  border-radius: 1.2rem;
  background-color: var(--color-accent);
  text-transform: capitalize;
  border: 0.2rem solid var(--color-accent);
  padding: 2.06rem 2.32rem 2.06rem 2.42rem;
  cursor: pointer;
  transition: color 260ms ease-in-out, background 260ms ease-in-out;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  &:hover {
    color: var(--color-accent);
    background-color: transparent;
  }
`;

// Component responsible for adding a new category
function AddCategory({ setShowCategoryInput }) {
  // State to store the value of the newly added category
  const [addedCategory, setAddedCategory] = useState('');

  // Custom hook to handle adding a new category
  const {
    addCategory,
    isLoading: isAddingCategory,
    error: addCategoryError,
  } = useAddCategory();

  // Function to handle changes in the input field for adding a category
  function handleCategoryChange(event) {
    if (!event) return;
    // Update the state with the new category value from the input field
    setAddedCategory(event.target.value);
  }

  // Function to handle adding the new category
  function handleAddCategory() {
    // Call the addCategory function from the custom hook with the new category value
    addCategory(addedCategory);
    // Hide the category input field after adding the new category
    setShowCategoryInput(false);
  }

  return (
    <AddCategoryContainer>
      {/* Input field for entering the new category */}
      <AddCategoryInput
        onChange={event => handleCategoryChange(event)}
        value={addedCategory}
        placeholder="Add category"
      />

      {/* Button to confirm adding the new category */}
      <AddCategoryButton
        onClick={handleAddCategory}
        disabled={isAddingCategory}
      >
        Add
      </AddCategoryButton>

      {addCategoryError && <p>{addCategoryError.message}</p>}
    </AddCategoryContainer>
  );
}

export default AddCategory;
