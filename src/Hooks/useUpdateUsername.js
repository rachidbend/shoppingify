import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUsername as updateUsernameAPI } from '../services/apiAuth';
import { useUser } from './useUser';
import toast from 'react-hot-toast';

// Custom hook to handle updating user's username
function useUpdateUsername() {
  // Hooks for accessing user data and cache management
  const { user } = useUser();
  const queryClient = useQueryClient();

  const {
    mutate: updateUsername, // Function to call to update username
    error,
  } = useMutation({
    mutationFn: ({ username }) =>
      updateUsernameAPI({ userId: user?.id, username }),

    onSuccess: () => {
      // Display success toast notification
      toast.success('Usename updated!');
    },
    onSettled: () => {
      // Invalidate 'profile' query to refresh user profile data
      queryClient.invalidateQueries(['profile']);
    },
    onError: error => {
      // Display error toast notification
      toast.error(error.message);
      // Throw error for error boundary or further handling
      throw new Error(error.message);
    },
  });

  // Return updateUsername mutation function and error state
  return { updateUsername, error };
}

export { useUpdateUsername };
