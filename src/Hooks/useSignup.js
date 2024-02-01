import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup as signupAPI } from '../services/apiAuth';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: signup,
    error,
    isLoading,
  } = useMutation({
    mutationFn: ({ email, password }) => signupAPI({ email, password }),
    onSuccess: () => {
      navigate('/items');
      queryClient.invalidateQueries();
      toast.success('Sign up was successful!');
      toast.success('You can login now');
    },
    onError: error => {
      toast.error(error.message);
      throw new Error(error.message);
    },
  });

  return {
    signup,
    error,
    isLoading,
  };
}

export { useSignup };
