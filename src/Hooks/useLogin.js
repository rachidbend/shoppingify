import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginAPI } from '../services/apiAuth';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

// Custom hook to handle user login
function useLogin() {
  // Hooks for navigation and cache management
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Mutation function for user login
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: user => {
      // Update user data in query cache
      queryClient.setQueryData(['user'], user);
      // Redirect to '/items' page
      navigate('/items');
      // Invalidate all queries to refresh data
      queryClient.invalidateQueries();
      // Display success toast notification
      toast.success('Login successful!');
    },
    onError: error => {
      // Display error toast notification
      toast.error(error.message);
      // Throw error for error boundary or further handling
      throw new Error(error.message);
    },
  });

  return { login, isLoading };
}

export { useLogin };
