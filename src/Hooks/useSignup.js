import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup as signupAPI } from '../services/apiAuth';
import { useNavigate } from 'react-router';

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
      queryClient.invalidateQueries(['items']);
    },
    onError: error => {
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
