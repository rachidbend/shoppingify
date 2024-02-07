/* eslint-disable react/prop-types */
import styled from 'styled-components';
import noItemsIllustration from '../../assets/undraw_shopping.svg';
import Modal from '../../UI/Model';
import { useState } from 'react';
import { updateShopplingListName } from '../../services/apiItems';
import { useUpdateShoppingListName } from '../../Hooks/useUpdateShoppingListName';
import toast from 'react-hot-toast';

const StyledShoppingListInput = styled.div`
  width: 38.9rem;
  position: fixed;
  bottom: 0;
  padding: 3.49rem 3.96rem;
  margin: 0 -3.19rem 0 -4.84rem;
  background-color: var(--color-white);

  @media screen and (min-width: 780px) and (max-width: 1024px) {
    width: 32rem;
    margin: 0 -1.43rem 0 -1.6rem;
    padding: 2.8rem 3rem;
  }

  @media screen and (max-width: 480px) {
    width: calc(100% - 6.1581rem);
    padding: 1.83rem 1.43rem 1.44rem 2.2rem;
    margin: 0 -1.43rem 0 -1.6rem;
  }
`;

const NoItemsIllustration = styled.img`
  position: absolute;
  top: -19.1rem;

  @media screen and (max-width: 480px) {
    width: 20rem;
    top: -15.6rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Container = styled.div`
  position: relative;
`;

const NameInput = styled.input`
  height: 6.125rem;
  width: 100%;
  border-radius: 1.2rem;
  border: 2px solid
    ${props =>
      props.disabled ? 'var(--color-grey-300)' : 'var(--color-accent)'};

  color: var(--color-title);
  padding: 0 1.76rem;
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
    props.disabled ? 'var(--color-grey-300)' : 'var(--color-accent)'};
  border: none;
  padding: 0 2.42rem 0 2.52rem;
  height: 100%;

  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-white);
  border-radius: 1.2rem;
  cursor: ${props => (props.disabled ? 'no-drop' : 'pointer')};
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3.96rem;
`;

const CancelButton = styled.button`
  color: var(--color-title);
  font-size: 1.6rem;
  font-weight: 700;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 260ms ease-in-out;
  &:hover {
    color: var(--color-grey-300);
  }
`;

const CompleteButton = styled.button`
  background-color: var(--color-blue);
  border-radius: 1.2rem;
  padding: 1.86rem 1.83rem 1.58rem 2.14rem;
  color: var(--color-white);
  font-size: 1.6rem;
  font-weight: 700;
  border: 2px solid var(--color-blue);
  cursor: pointer;
  transition: color 260ms ease-in-out, background 260ms ease-in-out;

  &:hover {
    background-color: transparent;
    color: var(--color-blue);
  }
`;

// Component responsible for managing input and actions related to the shopping list. (naming the list, completing or canceling it)
function ShoppingListInput({
  isEmptyList,
  shoppingListName,
  isLoadingShoppingList,
  onAddList,
}) {
  // State for managing list name input
  const [listName, setListName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Custom hook for updating list name
  const {
    updateListName,
    isLoading: isUpdatingListName,
    error: listNameError,
  } = useUpdateShoppingListName();

  // Function to handle changes in the list name input
  function listNameChangeHandler(event) {
    if (!event) return;
    setListName(event.target.value);
  }

  // Function to handle saving the list name
  function handleListNameSave() {
    // Ensure shopping list data is loaded
    if (isLoadingShoppingList) return;
    // Update the list name
    updateListName(
      { listName: listName },
      {
        onSuccess: () => {
          // Clear the input field on success
          setListName('');
        },
      }
    );
  }

  // Function to close the modal
  function onCloseModal() {
    setIsModalOpen(false);
  }

  // Function to confirm modal action and add list to history
  function onConfirmModal() {
    setIsModalOpen(false);
    onAddList(false);
  }

  // Display error toast if there's an error updating the list name
  if (listNameError) toast.error(listNameError.message);

  return (
    <StyledShoppingListInput>
      {/* Render illustration if the list is empty */}
      {isEmptyList && <NoItemsIllustration src={noItemsIllustration} />}
      {/* Render input field for list name */}
      {shoppingListName?.length === 0 && (
        <Container>
          <NameInput
            disabled={isEmptyList || isUpdatingListName || shoppingListName}
            type="text"
            placeholder="Enter a name"
            value={listName}
            onChange={listNameChangeHandler}
          />
          <SaveButton
            onClick={handleListNameSave}
            disabled={isEmptyList || isUpdatingListName || shoppingListName}
          >
            save
          </SaveButton>
        </Container>
      )}
      {/* Render buttons for completing or cancelling the list */}
      {shoppingListName?.length > 0 && (
        <ButtonsContainer>
          <CancelButton onClick={() => setIsModalOpen(true)}>
            cancel
          </CancelButton>
          <CompleteButton onClick={() => onAddList(true)}>
            Complete
          </CompleteButton>
        </ButtonsContainer>
      )}
      {/* Render modal component if modal is open */}
      {isModalOpen && (
        <Modal onClose={onCloseModal} onConfirm={onConfirmModal} />
      )}
      ;
    </StyledShoppingListInput>
  );
}

export default ShoppingListInput;
