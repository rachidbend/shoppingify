import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateShopplingListName } from '../services/apiItems';

function useUpdateShoppingListName() {
  const queryClient = useQueryClient();

  const {
    mutate: updateListName,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ id, listName }) => updateShopplingListName({ id, listName }),
    onSuccess: () => {
      queryClient.invalidateQueries('shopping_list');
    },
    onError: error => {
      throw new Error(error.message);
    },
  });

  return { updateListName, isLoading, error };
}

export { useUpdateShoppingListName };
