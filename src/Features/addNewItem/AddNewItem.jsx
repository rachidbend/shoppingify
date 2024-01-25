/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useGetCategories } from '../../Hooks/useGetCategories';
import { motion } from 'framer-motion';
import { useAddNewItem } from '../../Hooks/useAddNewItem';
import { MdClose } from 'react-icons/md';
import { itemVariantes } from '../../Variables/variables';
import { useAddCategory } from '../../Hooks/useAddCategory';

const StyledAddNewItem = styled(motion.div)`
  padding: 0 4.01rem;
  /* padding-top: 3.45rem; */
  position: relative;
  height: 100vh;
`;

const Title = styled.h2`
  color: var(--color-black);
  margin-top: 3.45rem;
  font-size: 2.4rem;
  font-weight: 500;
  margin-bottom: 3.38rem;
`;

const Form = styled(motion.form)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 3.49rem;
`;
// name
const Label = styled.label`
  color: var(--color-title);
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 0.61rem;
`;
const Input = styled.input`
  color: var(--color-title);
  font-size: 1.4rem;
  font-weight: 500;
  background-color: transparent;
  border-radius: 1.2rem;
  border: 0.2rem solid var(--color-gray-200);
  padding: 2.16rem 1.76rem;
  transition: border 260ms ease-in-out;
  outline: none;
  &::placeholder {
    color: var(--color-gray-200);
    font-family: var(--font-main);
  }

  &:focus {
    border: 0.2rem solid var(--color-accent);
  }
`;

const TextArea = styled.textarea`
  color: var(--color-title);
  font-size: 1.4rem;
  font-weight: 500;
  background-color: transparent;
  border-radius: 1.2rem;
  border: 0.2rem solid var(--color-gray-200);
  padding: 2.16rem 1.76rem;
  transition: border 260ms ease-in-out;
  height: 11.0215rem;
  outline: none;
  &::placeholder {
    color: var(--color-gray-200);
    font-family: var(--font-main);
  }

  &:focus {
    border: 0.2rem solid var(--color-accent);
  }
`;

const InputContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex-grow: 0;
  flex-shrink: 0;

  margin-bottom: ${props =>
    props.marginbottom ? props.marginbottom : '1.8rem'};
`;

// select component
const StyledSelect = styled.select`
  color: var(--color-title);
  font-size: 1.4rem;
  font-weight: 500;
  background-color: transparent;
  border-radius: 1.2rem;
  border: 0.2rem solid var(--color-gray-200);
  padding: 2.16rem 1.76rem;
  transition: border 260ms ease-in-out;
  outline: none;

  display: none;
`;

// custom select

const Select = styled.div`
  color: var(--color-title);
  font-size: 1.4rem;
  font-weight: 500;
  background-color: transparent;
  border-radius: 1.2rem;
  border: 0.2rem solid
    ${props =>
      props.isopen === 'true'
        ? 'var(--color-accent)'
        : 'var(--color-gray-200)'};
  padding: 2.16rem 1.76rem;
  transition: border 260ms ease-in-out;
  outline: none;

  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

  &:focus,
  &:hover,
  &:active {
    border: 0.2rem solid var(--color-accent);
  }
`;

const OptionsContainer = styled.div`
  padding: 1.24rem 0.73rem 1.12rem 0.82rem;
  background-color: var(--color-white);

  border-radius: 1.2rem;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.04);

  position: absolute;
  top: calc(100% + 1.22rem);
  left: 0;
  right: 0;
`;
const OptionsList = styled.ul``;
const OptionsItem = styled.li`
  color: var(--color-title);
  font-size: 1.4rem;
  font-weight: 500;
  padding: 1.13rem 2.28rem 1.25rem 2.28rem;
  list-style: none;
  margin-bottom: 0.22rem;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    border-radius: 1.2rem;
    background-color: #f2f2f2;
  }
`;

const Save = styled.input`
  padding: 1.96rem 2.32rem 1.96rem 2.42rem;
  color: var(--color-white);
  font-size: 1.6rem;
  font-weight: 700;
  border-radius: 1.2rem;
  background-color: var(--color-accent);
  text-transform: capitalize;

  border: 0.2rem solid var(--color-accent);
  cursor: pointer;
  transition: color 260ms ease-in-out, background 260ms ease-in-out;
  &:hover {
    background-color: transparent;
    color: var(--color-accent);
  }
`;
const Cancel = styled.input`
  color: var(--color-title);

  font-size: 1.6rem;
  padding: 2.06rem 2.42rem 2.06rem 2.52rem;
  font-weight: 700;
  transition: color 260ms ease-in-out;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    color: var(--color-gray-300);
  }
`;

const CustomSelectContainer = styled(motion.div)`
  position: relative;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.94rem;
  width: 100%;

  margin-top: auto;
`;

const CloseIcon = styled(MdClose)`
  width: 2.4rem;
  height: 2.4rem;
  color: var(--color-gray-400);
  cursor: pointer;
`;

const CloseIconContainer = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  display: inline-block;
  cursor: pointer;
`;

const CategoryPlaceHolder = styled.p`
  color: var(--color-gray-200);
  font-size: 1.4rem;
  font-weight: 500;
`;

// add new category

const AddCategoryButton = styled.button`
  background: none;
  border: none;
  font-size: 1.4rem;
  color: var(--color-gray-100);
  margin-top: 4rem;
  text-align: left;
  text-decoration: none;
  cursor: pointer;

  transition: color 260ms ease-in-out;

  &:hover {
    color: var(--color-blue);
    text-decoration: underline;
  }
`;

const AddCategoryContainer = styled.div`
  position: relative;
  margin-top: 2.4rem;
`;
const AddCategoryInput = styled(Input)`
  width: 100%;
  padding-right: 9rem;
`;

const AddCategoryAdd = styled.button`
  padding: 2.06rem 2.32rem 2.06rem 2.42rem;
  color: var(--color-white);
  font-size: 1.6rem;
  font-weight: 700;
  border-radius: 1.2rem;
  background-color: var(--color-accent);
  text-transform: capitalize;

  border: 0.2rem solid var(--color-accent);
  cursor: pointer;
  transition: color 260ms ease-in-out, background 260ms ease-in-out;

  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  &:hover {
    background-color: transparent;
    color: var(--color-accent);
  }
`;

function AddNewItem({ onchangePage }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [addedCategory, setAddedCategory] = useState('');

  const { categories, isLoading, error } = useGetCategories();
  const {
    addItem,
    error: itemError,
    isLoading: itemIsUploading,
  } = useAddNewItem();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { addCategory } = useAddCategory();

  const onSubmit = data => {
    console.log({ ...data, category: selectedCategory });
    if (data.name.length === 0 && selectedCategory.length === 0) return;
    addItem({ ...data, category: selectedCategory });
    reset();
    setSelectedCategory('');
  };

  function onOptionSelect(e) {
    setSelectedCategory(e.target.innerText);
    setIsOpen(false);
  }

  function onSelectOpen() {
    setIsOpen(!isOpen);
  }

  function onReset() {
    reset();
    setSelectedCategory('');
    onchangePage('shopping-list');
  }

  function onAddCategoryChange(e) {
    if (!e) return;

    setAddedCategory(e.target.value);
  }

  function onAddCategory() {
    addCategory(addedCategory);
    setShowCategoryInput(false);
  }

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <StyledAddNewItem>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Add a new item</Title>
        <InputContainer
          variants={itemVariantes}
          initial="initial"
          animate="final"
        >
          <Label>Name</Label>
          <Input
            placeholder="Enter a name"
            type="text"
            name="name"
            {...register('name', { required: true })}
          />
        </InputContainer>
        <InputContainer
          variants={itemVariantes}
          initial="initial"
          animate="final"
          marginbottom="2.43rem"
        >
          <Label>Note (optional)</Label>
          <TextArea
            placeholder="Enter a note"
            name="note"
            {...register('note')}
          />
        </InputContainer>
        <InputContainer
          variants={itemVariantes}
          initial="initial"
          animate="final"
          marginbottom="3.38rem"
        >
          <Label>Image (optional)</Label>
          <Input
            placeholder="Enter a url"
            type="text"
            name="image"
            {...register('image')}
          />
        </InputContainer>
        <InputContainer
          variants={itemVariantes}
          initial="initial"
          animate="final"
        >
          <Label>Category</Label>
          <StyledSelect
            name="category"
            id=""
            value={selectedCategory}
            {...register('category', { required: true })}
          >
            <option value={null}>no category</option>
            {categories.map(category => (
              <option key={`category-${category.id}`} value={category.name}>
                {category.name}
              </option>
            ))}

            {/* get the options from supabase and put them as options */}
          </StyledSelect>

          <CustomSelectContainer>
            <Select
              role="select"
              isopen={isOpen ? 'true' : 'false'}
              onClick={onSelectOpen}
            >
              {selectedCategory ? (
                selectedCategory
              ) : (
                <CategoryPlaceHolder>Enter a category</CategoryPlaceHolder>
              )}
              <CloseIconContainer
                onClick={() => {
                  setIsOpen(false);
                  setSelectedCategory('');
                }}
              >
                <CloseIcon />
              </CloseIconContainer>
            </Select>
            {isOpen && (
              <OptionsContainer>
                <OptionsList>
                  {categories.map(category => (
                    <OptionsItem
                      onClick={onOptionSelect}
                      value={category.name}
                      key={`category-item-${category.id}`}
                    >
                      {category.name}
                    </OptionsItem>
                  ))}
                </OptionsList>
              </OptionsContainer>
            )}
          </CustomSelectContainer>

          <AddCategoryButton
            onClick={() => setShowCategoryInput(!showCategoryInput)}
          >
            Add a new category!
          </AddCategoryButton>
          {showCategoryInput && (
            <AddCategoryContainer>
              <AddCategoryInput
                onChange={e => onAddCategoryChange(e)}
                value={addedCategory}
                placeholder="Add category"
              />
              <AddCategoryAdd onClick={onAddCategory}>Add</AddCategoryAdd>
            </AddCategoryContainer>
          )}
        </InputContainer>
        <ButtonsContainer>
          <Cancel type="reset" value="cancel" onClick={onReset} />
          <Save type="submit" value="save" />
        </ButtonsContainer>
      </Form>
    </StyledAddNewItem>
  );
}

export default AddNewItem;
