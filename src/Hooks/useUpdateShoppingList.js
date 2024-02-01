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
    onSuccess: () => {
      toast.success('Shopping list updated successfully!');
    },
    onSettled: () => {
      queryClient.invalidateQueries('shopping_list');
    },
    onError: error => {
      toast.error(error.message);
      throw new Error(error.message);
    },
  });

  return { updateShoppingList, isLoading, error };
}

export { useUpdateShoppingList };
