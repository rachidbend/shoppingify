import { useMutation, useQueryClient } from '@tanstack/react-query';
import { forgotPassword as forgotPasswordAPI } from '../services/apiAuth';
import toast from 'react-hot-toast';

// Custom hook to handle the forgot password functionality
function useForgotPassword() {
  const queryClient = useQueryClient();

  // Mutation function to initiate password reset
  const {
    mutate: forgotPassword, // Function to initiate password reset
    error,
    data,
  } = useMutation({
    mutationFn: email => forgotPasswordAPI(email),
    onSuccess: () => {
      // Display success notification
      toast.success('Check your Email!');
    },
    onSettled: () => {
      // Invalidate 'user' query to trigger refetch
      queryClient.invalidateQueries(['user']);
    },
    onError: error => {
      // Display error notification
      toast.error(error.message);
      // Throw error for error boundary or further handling
      throw new Error(error.message);
    },
  });

  return {
    forgotPassword,
    error,
    data,
  };
}

export { useForgotPassword };
