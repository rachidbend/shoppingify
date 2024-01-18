import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewItem } from '../services/apiItems';

function useAddNewItem() {
  const queryClient = useQueryClient();

  const {
    mutate: addItem,
    error,
    isLoading,
  } = useMutation({
    mutationFn: item => addNewItem(item),
    onSuccess: () => {
      queryClient.invalidateQueries('items');
    },
  });

  return { addItem, error, isLoading };
}

export { useAddNewItem };
