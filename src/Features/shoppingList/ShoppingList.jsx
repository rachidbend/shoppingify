/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { MdCreate } from 'react-icons/md';
import ShoppingItem from './ShoppingItem';
import { motion } from 'framer-motion';
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
const NoItems = styled.p`
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

function ShoppingList() {
  const [isEditMode, setIsEditMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // get the shopping list data
  const { shoppingList, isLoadingShoppingList, shoppingListError } =
    useGetAppData();
  // updating the sopping list (increasing/decreasing quantity, and removing items)
  const { updateShoppingList, error: listItemError } = useUpdateShoppingList();

  // adding the shopping list to the history
  const { uploadList } = useAddListToHistory();
  // used in adding shopping list
  const { history } = useGetHistory();

  // resets the list
  const { resetList } = useResetShoppingList();

  // when a user increases or decreases the quantity of an item
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

  // when the user clicks on the trash icon to remove an item from the list
  function onRemoveItem(deleteId) {
    if (isLoadingShoppingList) return;
    updateShoppingList({
      id: shoppingList.id,
      oldList: shoppingList.items,
      deleteItemId: deleteId,
      shoppingList: shoppingList,
    });
  }

  // when the user checks an item as purchased, or unchecks it
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

  function handeListState() {
    setIsEditMode(!isEditMode);
  }

  function onAddList(isCompleted) {
    if (isLoadingShoppingList) return;

    const list = {
      id: new Date(),
      created_at: new Date(),
      name: shoppingList.name,
      shopping_list: [...shoppingList.items],
      is_completed: isCompleted ? true : false,
      is_canceled: isCompleted ? false : true,
      completed_at: new Date(),
    };
    uploadList(
      { shoppingHistory: history, list },
      {
        onSuccess: () => {
          // once the list was added to the history, reset the current list
          resetList();
        },
      }
    );
  }

  function onCloseModal() {
    setIsModalOpen(false);
  }
  function onConfirmModal() {
    setIsModalOpen(false);
    onAddList(false);
  }

  // show spinner when first loading the shopping list
  if (isLoadingShoppingList) return <Spinner />;

  if (shoppingListError) toast.error(shoppingListError.message);
  if (listItemError) toast.error(listItemError.message);

  if (shoppingListError || listItemError) return <p>there was an error</p>;

  // check if the list is empty
  const isEmptyList =
    !shoppingList || !shoppingList.items || shoppingList.items.length === 0;

  // categorise the items in the list
  const categorizedItems = groupByProperty(shoppingList?.items, 'category');

  return (
    <StyledShoppingList>
      <ChildrenContainer>
        {/* add item call to action component */}
        <AddItem />

        {/* fi there is no items then this message is shown */}
        {isEmptyList && <NoItems>No items</NoItems>}

        {!isEmptyList && (
          <>
            {/* shopping title and  */}
            <ShoppingListHeader>
              <ListTitle>Shopping list</ListTitle>
              <EditListIcon onClick={handeListState} />
            </ShoppingListHeader>

            <ShoppingListItems>
              {Object.entries(categorizedItems).map(([category, items]) => (
                <ListItemsCategory key={`shopping list ${category}`}>
                  {/* name of the category */}
                  <ListItemsCategory.Title>{category}</ListItemsCategory.Title>
                  {/* the items that belong to that category */}
                  <ListItemsCategory.Container>
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
                  </ListItemsCategory.Container>
                </ListItemsCategory>
              ))}
            </ShoppingListItems>
          </>
        )}

        <ShoppingListInput
          isEmptyList={isEmptyList}
          isModalOpen={isModalOpen}
          shoppingList={shoppingList}
          isLoadingShoppingList={isLoadingShoppingList}
          onAddList={onAddList}
          onCloseModal={onCloseModal}
          onConfirmModal={onConfirmModal}
          setIsModalOpen={setIsModalOpen}
        />
      </ChildrenContainer>
    </StyledShoppingList>
  );
}

export default ShoppingList;
