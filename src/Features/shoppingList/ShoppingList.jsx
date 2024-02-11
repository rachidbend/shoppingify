/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { MdCreate } from 'react-icons/md';
import ShoppingItem from './ShoppingItem';
import { AnimatePresence, motion } from 'framer-motion';
import { useGetAppData } from '../../Context/AppContext';
import { useState } from 'react';
import { useUpdateShoppingList } from '../../Hooks/useUpdateShoppingList';
import Spinner from '../../UI/Spinner';
import { useAddListToHistory } from '../../Hooks/useAddListToHistory';
import { useGetHistory } from '../../Hooks/useGetHistory';
import toast from 'react-hot-toast';
import { groupByProperty } from '../../helpers/helperFunctions';
import ShoppingListInput from './ShoppingListInput';
import AddItem from './AddItem';
import ListItemsCategory from './ListItemsCategory';
import { useResetShoppingList } from '../../Hooks/useResetShoppingList';

const StyledShoppingList = styled(motion.div)`
  background-color: var(--color-shopping-list-background);
  padding: 0;
  display: flex;
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
  /* padding-bottom: 13rem; */
  padding: 4.37rem 3.19rem 0 4.84rem;
  height: 100vh;
  overflow: hidden;

  display: grid;
  grid-template-rows: auto auto 1fr auto;

  @media screen and (min-width: 780px) and (max-width: 1024px) {
    padding: 2.5rem 1.6rem 0 1.8rem;
  }

  @media screen and (max-width: 480px) {
    padding: 2.5rem 1.43rem 0 1.63rem;
  }
`;

// when there are no items
const NoItems = styled(motion.p)`
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-title);
  text-align: center;
  margin-top: 22.19rem;
  margin-bottom: auto;

  @media screen and (max-width: 480px) {
    margin-top: 12.19rem;
  }
`;

// Shopping list items //

// title
const ListTitle = styled.h2`
  color: var(--color-title);
  font-size: 2.4rem;
  font-weight: 700;
`;

const ShoppingListItems = styled(motion.div)`
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

const EditListIcon = styled(MdCreate)`
  color: var(--color-title);
  width: 2.4rem;
  height: 2.4rem;
  transform: translateY(0.4rem);
  cursor: pointer;

  transition: color var(--transition-button-text);

  &:hover {
    color: var(--color-accent);
  }
`;

const ShoppingListHeader = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-top: 4.4rem;
  margin-bottom: 3.93rem;
  align-items: flex-end;

  @media screen and (max-width: 480px) {
    margin-top: 3.23rem;
    margin-bottom: 3.93rem;
  }
`;

//  Component responsible for rendering and managing the shopping list.
function ShoppingList() {
  // State for managing edit mode and modal visibility
  const [isEditMode, setIsEditMode] = useState(true);

  // Custom hooks for fetching shopping list data and managing updates
  const { shoppingList, isLoadingShoppingList, shoppingListError } =
    useGetAppData();
  const { updateShoppingList, error: listItemError } = useUpdateShoppingList();
  const { uploadList } = useAddListToHistory();
  const { history } = useGetHistory();
  const { resetList } = useResetShoppingList();

  // Function to update item quantity in the shopping list
  function updateListItemQuantity(itemId, incease) {
    if (isLoadingShoppingList) return;
    updateShoppingList({
      id: shoppingList.id,
      oldList: shoppingList.items,
      updateQuantity: {
        itemId,
        update: incease ? 'increase' : 'decrease',
      },
      shoppingList: shoppingList,
    });
  }

  // Function to remove an item from the shopping list
  function onRemoveItem(deleteId) {
    if (isLoadingShoppingList) return;
    updateShoppingList({
      id: shoppingList.id,
      oldList: shoppingList.items,
      deleteItemId: deleteId,
      shoppingList: shoppingList,
    });
  }

  // Function to toggle item purchase state
  function itemPurchaseStatehandler(id, value) {
    if (isLoadingShoppingList) return;
    updateShoppingList({
      id: shoppingList.id,
      oldList: shoppingList.items,
      itemIsPurchased: {
        id,
        value,
      },
    });
  }

  // Function to toggle between editings and completing modes
  function handeListState() {
    setIsEditMode(!isEditMode);
  }

  // Function to handle adding the shopping list to history
  function onAddList(isCompleted) {
    // Ensure data exists
    if (isLoadingShoppingList) return;

    // Create the list
    const list = {
      id: new Date(),
      created_at: new Date(),
      name: shoppingList.name,
      shopping_list: [...shoppingList.items],
      is_completed: isCompleted ? true : false,
      is_canceled: isCompleted ? false : true,
      completed_at: new Date(),
    };
    // Upload list to hitory
    uploadList(
      { shoppingHistory: history, list },
      {
        onSuccess: () => {
          // Reset the current shopping list when upload to history was succussful
          resetList();
        },
      }
    );
  }

  // Show spinner when loading shopping list data
  if (isLoadingShoppingList) return <Spinner />;

  // Show error message if there's an error fetching shopping list data or updating items
  if (shoppingListError) toast.error(shoppingListError.message);
  if (listItemError) toast.error(listItemError.message);

  // Check if the list is empty
  const isEmptyList =
    !shoppingList || !shoppingList.items || shoppingList.items.length === 0;

  // Group items by category
  const categorizedItems = groupByProperty(shoppingList?.items, 'category');

  return (
    <StyledShoppingList
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >
      <ChildrenContainer>
        {/* Call to action component for adding items */}
        <AddItem />

        {/* Show message if the list is empty */}

        {isEmptyList && (
          <NoItems initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            No items
          </NoItems>
        )}

        {!isEmptyList && (
          <>
            {/* Shopping list title and edit mode toggle */}
            <ShoppingListHeader>
              <ListTitle>Shopping list</ListTitle>
              <EditListIcon onClick={handeListState} />
            </ShoppingListHeader>

            {/* Render categorized items */}
            <ShoppingListItems>
              <AnimatePresence>
                {Object.entries(categorizedItems).map(([category, items]) => (
                  <ListItemsCategory key={`shopping list ${category}`}>
                    {/* Category title */}
                    <ListItemsCategory.Title layout>
                      {category}
                    </ListItemsCategory.Title>
                    {/* Items within the category */}
                    <ListItemsCategory.Container>
                      <AnimatePresence>
                        {items.map(item => (
                          <ShoppingItem
                            onUpdateQuantity={updateListItemQuantity}
                            onDelete={onRemoveItem}
                            isEditing={isEditMode}
                            onPurchase={itemPurchaseStatehandler}
                            key={item.id}
                            item={item}
                          />
                        ))}
                      </AnimatePresence>
                    </ListItemsCategory.Container>
                  </ListItemsCategory>
                ))}
              </AnimatePresence>
            </ShoppingListItems>
          </>
        )}

        {/* Input component for managing list and modal */}
        <ShoppingListInput
          isEmptyList={isEmptyList}
          shoppingListName={shoppingList?.name}
          isLoadingShoppingList={isLoadingShoppingList}
          onAddList={onAddList}
        />
      </ChildrenContainer>
    </StyledShoppingList>
  );
}

export default ShoppingList;
