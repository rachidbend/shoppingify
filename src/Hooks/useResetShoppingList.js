import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resetShoppingList } from '../services/apiItems';
import { useUser } from './useUser';
import toast from 'react-hot-toast';

// Custom hook to handle resetting the shopping list

function useResetShoppingList() {
  // Hooks for user data and cache management
  const { user } = useUser();
  const queryClient = useQueryClient();

  // Mutation function for resetting the shopping list
  const {
    mutate: resetList, // Function to call to reset the shopping list
    error,
    status,
  } = useMutation({
    mutationFn: () => resetShoppingList({ userId: user.id }),

    onSuccess: () => {
      // Display success toast notification
      toast.success('Shopping list reset successful!');
    },

    onError: error => {
      // Display error toast notification
      toast.error(error.message);
      // Throw error for error boundary or further handling
      throw new Error(error.message);
    },
    onSettled: () => {
      // Invalidate shopping_list query to trigger refetch
      queryClient.invalidateQueries(['shopping_list']);
    },
  });

  // Return resetList mutation function, error state, and status
  return { resetList, error, status };
}

export { useResetShoppingList };
