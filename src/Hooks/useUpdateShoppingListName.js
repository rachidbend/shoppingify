import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateShopplingListName } from '../services/apiItems';
import { useUser } from './useUser';
import { useGetShoppingList } from './useGetShoppingList';

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
      id,
      listName,
      reset,
    }) =>
      updateShopplingListName({ userId, shoppingList, id, listName, reset }),
    onSuccess: () => {},
    onSettled: () => {
      queryClient.invalidateQueries('shopping_list');
    },
    onError: error => {
      throw new Error(error.message);
    },
  });

  return { updateListName, isLoading, error };
}

export { useUpdateShoppingListName };
