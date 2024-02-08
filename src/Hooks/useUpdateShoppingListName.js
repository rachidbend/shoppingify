import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateShopplingListName } from '../services/apiItems';
import { useUser } from './useUser';
import { useGetShoppingList } from './useGetShoppingList';
import toast from 'react-hot-toast';

// Custom hook to handle updating the shopping list name
function useUpdateShoppingListName() {
  // Hooks for cache management, user data, and fetching shopping list
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { shoppingList: shopping } = useGetShoppingList();

  // Mutation function for updating shopping list name
  const {
    mutate: updateListName, // Function to call to update shopping list name
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ userId = user.id, shoppingList = shopping, listName }) =>
      updateShopplingListName({ userId, shoppingList, id: 1, listName }),

    onSuccess: () => {
      // Display success toast notification
      toast.success('Shopping list name updated successfuly!');
    },
    onSettled: () => {
      // Invalidate 'shopping_list' query to trigger refetch
      queryClient.invalidateQueries('shopping_list');
    },
    onError: error => {
      // Display error toast notification
      toast.error(error.message);
      // Throw error for error boundary or further handling
      throw new Error(error.message);
    },
  });

  // Return updateListName mutation function, loading state, and error stat
  return { updateListName, isLoading, error };
}

export { useUpdateShoppingListName };
