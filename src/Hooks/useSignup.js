import { useMutation } from '@tanstack/react-query';
import { signup as signupAPI } from '../services/apiAuth';

function useSignup() {
  const {
    mutate: signup,
    error,
    isLoading,
  } = useMutation({
    mutationFn: ({ email, password }) => signupAPI({ email, password }),
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
