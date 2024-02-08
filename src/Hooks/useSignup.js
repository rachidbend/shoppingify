import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup as signupAPI } from '../services/apiAuth';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

// Custom hook to handle user signup
function useSignup() {
  // Hooks for navigation and cache management
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: signup, // Function to call to sign up a user
    error,
    isLoading,
  } = useMutation({
    mutationFn: ({ email, password }) => signupAPI({ email, password }),
    onSuccess: () => {
      // When signup successfull
      // Redirect to '/confirm' page
      navigate('/confirm');
      // Invalidate all queries to refresh data
      queryClient.invalidateQueries();
      // Display success toast notifications
      toast.success('Sign up was successful!');
    },
    onError: error => {
      // Display error toast notification
      toast.error(error.message);
      // Throw error for error boundary or further handling
      throw new Error(error.message);
    },
  });

  // Return signup mutation function, error state, and loading state
  return {
    signup,
    error,
    isLoading,
  };
}

export { useSignup };
