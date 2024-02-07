import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { addListToHistory } from '../services/apiItems';
import { useUpdateShoppingListName } from './useUpdateShoppingListName';
import { useUpdateShoppingList } from './useUpdateShoppingList';
import { useUser } from './useUser';
import toast from 'react-hot-toast';

function useAddListToHistory() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const {
    mutate: uploadList,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ userId = user.id, shoppingHistory, list }) =>
      addListToHistory({ userId, shoppingHistory, list }),
    onSuccess: () => {
      toast.success('Shopping list added to history successfully');

      queryClient.invalidateQueries('shopping_list');
    },
    onSettled: () => {
      queryClient.invalidateQueries('shopping_list');
    },
    onError: error => {
      toast.error(error.message);
      throw new Error(error.message);
    },
  });

  return {
    uploadList,
    isLoading,
    error,
  };
}

export { useAddListToHistory };
