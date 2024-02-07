import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateShopplingListName } from '../services/apiItems';
import { useUser } from './useUser';
import { useGetShoppingList } from './useGetShoppingList';
import toast from 'react-hot-toast';

function useUpdateShoppingListName() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { shoppingList: shopping } = useGetShoppingList();
  const {
    mutate: updateListName,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({
      userId = user.id,
      shoppingList = shopping,
      listName,
      reset,
    }) =>
      updateShopplingListName({ userId, shoppingList, id: 1, listName, reset }),
    onSuccess: () => {
      toast.success('Shopping list name updated successfuly!');
    },
    onSettled: () => {
      queryClient.invalidateQueries('shopping_list');
    },
    onError: error => {
      toast.error(error.message);
      throw new Error(error.message);
    },
  });

  return { updateListName, isLoading, error };
}

export { useUpdateShoppingListName };
