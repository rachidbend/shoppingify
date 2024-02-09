import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateShoppingListItems } from '../services/apiItems';
import { useUser } from './useUser';
import { useGetShoppingList } from './useGetShoppingList';
import toast from 'react-hot-toast';
import {
  deleteItemFromList,
  updateListWithNewItem,
  updatePurchaseStateOfItem,
  updateQuantityOfItem,
} from '../helpers/helperFunctions';

// Custom hook to update the shopping list
function useUpdateShoppingList() {
  // Initialize QueryClient
  const queryClient = useQueryClient();
  // Get current user
  const { user } = useUser();
  // Get shopping list data
  const { shoppingList: shopping } = useGetShoppingList();

  // Mutation function to update the shopping list items
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
      // Destructure new data
      const {
        item,
        oldList,
        updateQuantity,
        deleteItemId,
        itemIsPurchased,
        shoppingList = shopping,
      } = newData;
      // Cancel any ongoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ['shopping_list'] });

      // Snapshot the previous shopping list data
      const previousShoppingList = queryClient.getQueryData(['shopping_list']);

      // Initialize updated list with the existing list or an empty array if no list provided
      let updatedList = oldList || [];

      // Check for duplicates
      if (item) {
        updateListWithNewItem(updatedList, item);
      }
      // Update quantity
      if (updateQuantity) {
        updatedList = updateQuantityOfItem(updatedList, updateQuantity);
      }
      // Delete item
      if (deleteItemId) {
        updatedList = deleteItemFromList(updatedList, deleteItemId);
      }

      // Update purchase state
      if (itemIsPurchased) {
        updatedList = updatePurchaseStateOfItem(updatedList, itemIsPurchased);
      }
      // Create new shopping list object with updated items
      const newShoppingList = {
        ...shoppingList,
        items: updatedList,
      };
      // Optimistically update to the new value
      queryClient.setQueryData(['shopping_list'], newShoppingList);
      // Return a context with the previous and new shopping list data
      return { previousShoppingList, newShoppingList };
    },

    onSuccess: () => {
      // Display success notification
      // toast.success('Shopping list updated!');
      queryClient.invalidateQueries('shopping_list');
    },
    onSettled: () => {
      // Invalidate the 'items' query to reflect the change in cache
      queryClient.invalidateQueries('shopping_list');
    },
    // onError is called if the mutation encounters an error
    onError: (error, newData, context) => {
      // If there's an error, revert the optimistic update
      queryClient.setQueryData(
        ['shoppingList', newData.userId],
        context.previousShoppingList
      );

      // Display error notification
      toast.error(error.message);
      // Throw error for error boundary or further handling
      throw new Error(error.message);
    },
  });

  return { updateShoppingList, isLoading, error };
}

export { useUpdateShoppingList };

/*



*/
