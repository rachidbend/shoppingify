import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateShoppingListItems } from '../services/apiItems';
import { useUser } from './useUser';
import { useGetShoppingList } from './useGetShoppingList';
import toast from 'react-hot-toast';

function useUpdateShoppingList() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { shoppingList: shopping } = useGetShoppingList();
  const {
    mutate: updateShoppingList,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({
      id,
      item,
      oldList,
      updateQuantity,
      deleteItemId,
      itemIsPurchased,
    }) =>
      updateShoppingListItems({
        userId: user.id,
        id,
        item,
        oldList,
        updateQuantity,
        deleteItemId,
        itemIsPurchased,
        shoppingList: shopping,
      }),
    onMutate: async newData => {
      const {
        userId,
        item,
        oldList,
        updateQuantity,
        deleteItemId,
        itemIsPurchased,
        shoppingList,
      } = newData;
      // Cancel any ongoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ['shopping_list'] });

      // Snapshot the previous shopping list data
      const previousShoppingList = queryClient.getQueryData(['shopping_list']);

      // treat the data to prepare it
      // i get a json object
      // when an item is added, add the new item to the current list of items
      let duplicate, newList;
      // ADD ITEM TO LIST
      // check if there is a duplicate
      if (item) {
        duplicate =
          oldList === undefined || oldList === null
            ? [false]
            : oldList.map(oldItem => oldItem.name === item.name);

        // if there is then don't add that item
        if (duplicate.includes(true)) return;
        // if there isn't a duplicate item then add it to the list
        newList =
          oldList === undefined || oldList === null
            ? [{ ...item, quantity: 1 }]
            : [...oldList, { ...item, quantity: 1, isPurchased: false }];
      } else {
        newList = oldList;
      }
      // when i want to delete an item, filter the list to get the other items
      //  when a quantity is updated, change the quantitity

      // when i need to change the quantity, i have the items, and only need to change the quantity of that specific item, i need the id, i need to know by how much to increse or decrease

      // UPDATE ITEM QUANTITY
      // 1. need to know to increase or decrease,
      let updatedList;
      // if we want to update the quantity, meaning if updateQuantity exists
      if (updateQuantity)
        /* we go through all the items to update the one we need */
        updatedList = oldList.map(item => {
          // if the id of the item we wnt to update matches the id of the current item
          if (updateQuantity.itemId === item.id) {
            // then we check if we need to increase
            if (updateQuantity.update === 'increase')
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            // or fi we need to decrease its quantity
            if (updateQuantity.update === 'decrease')
              return {
                ...item,
                quantity: item.quantity === 1 ? 1 : item.quantity - 1,
              };
          }

          // if the current item is not the item we want to update, then we return the item
          return item;
        });

      // DELETE ITEM FROM LIST
      // get the id of the item we want to remove
      // filter out that item form the list
      if (deleteItemId)
        newList = oldList.filter(item => deleteItemId !== item.id);

      // Update the purchased state
      // 1. check if the item purchased state is changed
      // 2. change the isPurchased for that specific item, and return the list
      if (itemIsPurchased)
        updatedList = oldList.map(item => {
          if (item.id === itemIsPurchased.id)
            return { ...item, isPurchased: itemIsPurchased.value };

          return item;
        });

      const newShoppingList = {
        ...shoppingList,
        items: updatedList ? updatedList : newList,
      };
      console.log(previousShoppingList);
      // Optimistically update to the new value
      queryClient.setQueryData(['shopping_list'], newShoppingList);
      console.log(newShoppingList);
      // Return a context with the previous and new shopping list data
      return { previousShoppingList, newShoppingList };
    },

    onSuccess: () => {
      toast.success('Shopping list updated successfully!');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['shopping_list']);
    },
    // onError is called if the mutation encounters an error
    onError: (error, newData, context) => {
      // If there's an error, revert the optimistic update
      queryClient.setQueryData(
        ['shoppingList', newData.userId],
        context.previousShoppingList
      );
      toast.error(error.message);
      throw new Error(error.message);
    },
  });

  return { updateShoppingList, isLoading, error };
}

export { useUpdateShoppingList };

/*



*/
