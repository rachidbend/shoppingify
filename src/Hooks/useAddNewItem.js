import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewItem } from '../services/apiItems';
import { useUser } from './useUser';
import { useGetAllItems } from './useGetAllItems';
import toast from 'react-hot-toast';

// Custom hook to add a new item to the items list
function useAddNewItem() {
  // Query client for cache management
  const queryClient = useQueryClient();
  // Current user information
  const { user } = useUser();
  //  Get all current items
  const { items } = useGetAllItems();

  // Mutation function to upload the new item to items list
  const {
    mutate: addItem, // Mutation to add the item
    error,
    isLoading,
  } = useMutation({
    mutationFn: item => addNewItem({ userId: user.id, allItems: items, item }),
    onSuccess: () => {
      // Display success notification
      toast.success('Item added successfully!');
    },
    onSettled: () => {
      // Invalidate 'items' query to trigger refetch
      queryClient.invalidateQueries(['items']);
    },
    onError: error => {
      // Display error notification
      toast.error(error.message);
      // Throw error for further handling
      throw new Error(error.message);
    },
  });

  // Return necessary values and functions for component usage
  return { addItem, error, isLoading };
}

export { useAddNewItem };
