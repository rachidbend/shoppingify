import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCategory as addCategoryAPI } from '../services/apiItems';
import { useUser } from './useUser';
import { useGetCategories } from './useGetCategories';
import toast from 'react-hot-toast';

// Custom hook to handle adding a new category
function useAddCategory() {
  // Query client for cache management
  const queryClient = useQueryClient();
  // Current user information
  const { user } = useUser();
  // Fetching existing categories
  const { categories } = useGetCategories();
  const {
    mutate: addCategory, // Mutation function for adding a category
    isLoading,
    error,
  } = useMutation({
    mutationFn: category =>
      addCategoryAPI({ userId: user.id, allCategories: categories, category }), // Actual API call to add the categor

    onSuccess: () => {
      // Show success toast notification
      toast.success('Category added!');
    },

    onSettled: () => {
      // Invalidate categories query to reflect changes in cache
      queryClient.invalidateQueries(['categories']);
    },

    onError: error => {
      // Show error toast notification and throw error
      toast.error(error.message);
      throw new Error(error.message);
    },
  });

  // Return necessary values and functions for component usage
  return {
    addCategory,
    isLoading,
    error,
  };
}

export { useAddCategory };
