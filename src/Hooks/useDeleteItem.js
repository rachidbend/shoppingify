import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteItem as deleteItemApi } from '../services/apiItems';
import { useUser } from './useUser';
import { useGetAllItems } from './useGetAllItems';
import toast from 'react-hot-toast';

function useDeleteItem() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { items } = useGetAllItems();

  const {
    mutate: deleteItem,
    isLoading,
    error,
  } = useMutation({
    mutationFn: itemId =>
      deleteItemApi({ userId: user.id, allItems: items, itemId }),
    onSuccess: () => {
      queryClient.invalidateQueries('items');
      toast.success('Item was deleted successfully!');
    },
    onError: error => {
      toast.error(error.message);
      throw new Error(error.message);
    },
  });

  return { deleteItem, isLoading, error };
}

export { useDeleteItem };
