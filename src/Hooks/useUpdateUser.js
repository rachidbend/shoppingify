import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser as updateUserAPI } from '../services/apiAuth';
import toast from 'react-hot-toast';

// Custom hook to handle updating user data
function useUpdateUser() {
  // Hook for cache management
  const queryClient = useQueryClient();

  const {
    mutate: updateUser, // Function to call to update user data
    error,
    isLoading,
  } = useMutation({
    mutationFn: ({ email, password }) => updateUserAPI({ email, password }),
    onSuccess: () => {
      // Display success toast notification
      toast.success('User data updated!');
    },
    onSettled: () => {
      // Invalidate 'user' query to refresh user data
      queryClient.invalidateQueries(['user']);
    },
    onError: error => {
      // Display error toast notification
      toast.error(error.message);
      // Throw error for error boundary or further handling
      throw new Error(error.message);
    },
  });

  // Return updateUser mutation function and error state
  return {
    updateUser,
    error,
    isLoading,
  };
}

export { useUpdateUser };
