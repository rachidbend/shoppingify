import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteItem as deleteItemApi } from '../services/apiItems';
import { useUser } from './useUser';
import { useGetAllItems } from './useGetAllItems';
import toast from 'react-hot-toast';

// Custom hook to handle item deletion
function useDeleteItem() {
  // Query client for cache management
  const queryClient = useQueryClient();
  // Current user information
  const { user } = useUser();
  // Get all current items
  const { items } = useGetAllItems();

  // Mutation function to delete an item
  const {
    mutate: deleteItem, // Mutation function for item deletion
    isLoading,
    error,
  } = useMutation({
    mutationFn: itemId =>
      deleteItemApi({ userId: user.id, allItems: items, itemId }),
    onSuccess: () => {
      // Display success notification
      toast.success('Item deleted!');
    },
    onSettled: () => {
      // Invalidate the 'items' query to reflect the change in cache
      queryClient.invalidateQueries(['items']);
    },
    onError: error => {
      // Display error notification
      toast.error(error.message);
      // Throw error for error boundary or further handling
      throw new Error(error.message);
    },
  });

  return { deleteItem, isLoading, error };
}

export { useDeleteItem };
