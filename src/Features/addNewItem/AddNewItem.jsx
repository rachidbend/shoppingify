/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useGetCategories } from '../../Hooks/useGetCategories';
import { AnimatePresence, motion } from 'framer-motion';
import { useAddNewItem } from '../../Hooks/useAddNewItem';
import Spinner from '../../UI/Spinner';
import toast from 'react-hot-toast';
import CategoryDropdown from './CategoryDropdown';
import AddCategory from './AddCategory';

const StyledAddNewItem = styled(motion.div)`
  padding: 0 4rem;

  /* padding-top: 3.45rem; */
  position: relative;
  background-color: var(--color-background);
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
  overflow-x: hidden;

  @media screen and (max-width: 480px) {
    padding-bottom: 2rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: 2.4rem;
  font-weight: 500;
  color: var(--color-black);
  margin-bottom: 3.38rem;
  margin-top: 3.45rem;
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 3.49rem;
`;

const Label = styled(motion.label)`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-title);
  margin-bottom: 0.61rem;
  display: inline-block;
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

  transition: border var(--transition-input);

  &::placeholder {
    color: var(--color-grey-200);
    font-family: var(--font-main);
  }
  &:focus,
  &:hover {
    border: 0.2rem solid var(--color-accent);
  }
`;

const TextArea = styled.textarea`
  height: 11.0215rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-title);
  background-color: transparent;
  border-radius: 1.2rem;
  border: 0.2rem solid var(--color-grey-200);
  padding: 2.16rem 1.76rem;
  outline: none;
  transition: border var(--transition-input);
  &::placeholder {
    color: var(--color-grey-200);
    font-family: var(--font-main);
  }
  &:focus,
  &:hover {
    border: 0.2rem solid var(--color-accent);
  }
`;

const InputContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin-bottom: ${props =>
    props.marginbottom ? props.marginbottom : '1.8rem'};
`;

const Save = styled.input`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-white);
  border-radius: 1.2rem;
  background-color: var(--color-accent);
  padding: 1.96rem 2.32rem 1.96rem 2.42rem;
  text-transform: capitalize;
  border: 0.2rem solid var(--color-accent);
  cursor: pointer;
  transition: background var(--transition-button),
    color var(--transition-button);
  &:hover {
    background-color: transparent;
    color: var(--color-accent);
  }
`;

const Cancel = styled.input`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-title);
  background: none;
  padding: 2.06rem 2.42rem 2.06rem 2.52rem;
  border: none;
  cursor: pointer;
  transition: background var(--transition-button),
    color var(--transition-button);
  &:hover {
    color: var(--color-grey-300);
  }
`;

const ButtonsContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.94rem;
  width: 100%;
  margin-top: auto;
`;

const AddCategoryButton = styled.button`
  font-size: 1.4rem;
  color: var(--color-grey-100);
  background: none;
  border: none;
  margin-top: 4rem;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: color var(--transition-button-text);
  &:hover {
    color: var(--color-blue);
    text-decoration: underline;
  }
`;

const SpinnerContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: var(--color-background);
`;

const parentContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      delay: 0.2,
      duration: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const childrenVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeIn' } },
};

// Component for adding a new item to items list
function AddNewItem({ onchangePage }) {
  // State for managing form data and UI state
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCategoryInput, setShowCategoryInput] = useState(false);

  // Custom hooks for fetching categories
  const { isLoading: isLoadingCategories } = useGetCategories();

  // Custom hooks for adding new items
  const {
    addItem,
    error: addItemError,
    isLoading: addingItem,
  } = useAddNewItem();

  // React Hook Form hook for form validation and submission
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm();

  // Handler for form submission
  const onSubmit = data => {
    if (data.name.length === 0 && selectedCategory.length === 0) return;
    // Add the item
    addItem(
      { ...data, category: selectedCategory },
      {
        onSuccess: () => {
          // When the item is added successfuly, reset the form and selected category
          resetForm();
          setSelectedCategory('');
          // Navigate out of the current page to display the shopping list
          onchangePage('shopping-list');
        },
      }
    );
  };

  // Handler for selecting a category from the dropdown
  function handleSelectCategory(category) {
    setSelectedCategory(category);
  }

  // Handler for resetting the form and navigating to the previous page
  function onReset() {
    // Reset the form and selected category
    resetForm();
    setSelectedCategory('');
    // Navigate out of the current page to display the shopping list
    onchangePage('shopping-list');
  }

  // Render loading state if categories are still being fetched
  if (isLoadingCategories)
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  // Render error toast if there's an error fetching categories
  if (addItemError) toast.error(addItemError.message);

  return (
    <StyledAddNewItem>
      {/* Form for adding a new item */}
      <Form
        variants={parentContainerVariants}
        initial="hidden"
        animate="show"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Title variants={childrenVariants}>Add a new item</Title>
        {/* Form fields for item details */}
        <InputContainer variants={childrenVariants}>
          <Label>Name</Label>
          <Input
            placeholder="Enter a name"
            type="text"
            name="name"
            {...register('name', { required: true })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </InputContainer>
        <InputContainer variants={childrenVariants} marginbottom="2.43rem">
          <Label>Note (optional)</Label>
          <TextArea
            placeholder="Enter a note"
            name="note"
            {...register('note')}
          />
          {errors.note && <p>{errors.note.message}</p>}
        </InputContainer>
        <InputContainer variants={childrenVariants} marginbottom="3.38rem">
          <Label>Image (optional)</Label>
          <Input
            placeholder="Enter a url"
            type="text"
            name="image"
            {...register('image')}
          />
          {errors.image && <p>{errors.image.message}</p>}
        </InputContainer>
        {/* Dropdown for selecting item category, this one is not shown */}

        <InputContainer variants={childrenVariants}>
          <Label>Category</Label>

          {/* Custom dropdown component */}

          <CategoryDropdown
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />

          {/* Button to show input for adding a new category */}
          <AddCategoryButton
            onClick={() => setShowCategoryInput(!showCategoryInput)}
          >
            Add a new category!
          </AddCategoryButton>

          {/* Input field for adding a new category */}
          <AnimatePresence>
            {showCategoryInput && (
              <AddCategory setShowCategoryInput={setShowCategoryInput} />
            )}
          </AnimatePresence>
        </InputContainer>

        {/* Form submission buttons */}

        <ButtonsContainer variants={childrenVariants}>
          <Cancel type="reset" value="cancel" onClick={onReset} />
          <Save type="submit" value="save" disabled={addingItem} />
        </ButtonsContainer>
      </Form>
    </StyledAddNewItem>
  );
}

export default AddNewItem;
