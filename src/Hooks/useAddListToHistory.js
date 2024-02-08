import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addListToHistory } from '../services/apiItems';
import { useUser } from './useUser';
import toast from 'react-hot-toast';

// Custom hook to add a shopping list to the history
function useAddListToHistory() {
  // Query client for cache management
  const queryClient = useQueryClient();
  // Current user information
  const { user } = useUser();

  // Mutation function to upload list to history
  const {
    mutate: uploadList,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ userId = user.id, shoppingHistory, list }) =>
      addListToHistory({ userId, shoppingHistory, list }),
    onSuccess: () => {
      // Show success toast notification
      toast.success('List added to history!');
    },
    onSettled: () => {
      // Invalidate shopping_list query to trigger refetch
      queryClient.invalidateQueries('shopping_list');
    },
    onError: error => {
      // Show error toast notification
      toast.error(error.message);
      // Throw error for error boundary or further handling
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
