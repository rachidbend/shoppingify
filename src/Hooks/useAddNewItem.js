import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewItem } from '../services/apiItems';
import { useUser } from './useUser';
import { useGetAllItems } from './useGetAllItems';
import toast from 'react-hot-toast';

function useAddNewItem() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { items } = useGetAllItems();
  const {
    mutate: addItem,
    error,
    isLoading,
  } = useMutation({
    mutationFn: item => addNewItem({ userId: user.id, allItems: items, item }),
    onSuccess: () => {
      queryClient.invalidateQueries('items');
      toast.success('Item was added successfully!');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { addItem, error, isLoading };
}

export { useAddNewItem };
