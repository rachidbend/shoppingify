import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteItem as deleteItemApi } from '../services/apiItems';

function useDeleteItem() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteItem,
    isLoading,
    error,
  } = useMutation({
    mutationFn: itemId => deleteItemApi(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries('items');
    },
    onError: () => {
      throw new Error(error.message);
    },
  });

  return { deleteItem, isLoading, error };
}

export { useDeleteItem };
