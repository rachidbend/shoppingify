import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateShoppingListItems } from '../services/apiItems';

function useUpdateShoppingList() {
  const queryClient = useQueryClient();

  const {
    mutate: updateShoppingList,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ id, item, oldList }) =>
      updateShoppingListItems({ id, item, oldList }),
    onSuccess: () => {
      queryClient.invalidateQueries('shopping_list');
    },
    onError: error => {
      throw new Error(error.message);
    },
  });

  return { updateShoppingList, isLoading, error };
}

export { useUpdateShoppingList };