import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resetShoppingList } from '../services/apiItems';
import { useUser } from './useUser';
import toast from 'react-hot-toast';

function useResetShoppingList() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const {
    mutate: resetList,
    error,
    status,
  } = useMutation({
    mutationFn: () => resetShoppingList({ userId: user.id }),
    onSuccess: () => {
      toast.success('Shopping list reset successful!');
    },

    onError: error => {
      toast.error(error.message);
      throw new Error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['shopping_list']);
    },
  });

  return { resetList, error, status };
}
export { useResetShoppingList };
