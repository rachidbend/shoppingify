import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutAPI } from '../services/apiAuth';
import toast from 'react-hot-toast';

// Custom hook to handle user logout
function useLogout() {
  // Hook for cache management
  const queryClient = useQueryClient();

  // Mutation function for user logout
  const { mutate: logout, error } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      // Display success toast notification
      toast.success('Logout successfull!');
      // // Update user data in query cache to null
      // queryClient.setQueryData(['user'], null);
      // // Update items data in query cache to an empty array
      // queryClient.setQueryData(['items'], []);
    },
    onSettled: () => {
      // Invalidate all queries to refresh data
      queryClient.invalidateQueries();
    },
    onError: error => {
      // Display error toast notification
      toast.error(error.message);
      // Throw error for error boundary or further handling
      throw new Error(error.message);
    },
  });

  // Return logout mutation function and error state
  return { logout, error };
}

export { useLogout };
