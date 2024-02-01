import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginAPI } from '../services/apiAuth';
import { useNavigate } from 'react-router';

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: user => {
      queryClient.setQueryData(['user'], user);
      navigate('/items');
      queryClient.invalidateQueries(['items']);
    },
    onError: error => {
      console.log('error', error.message);
    },
  });

  return { login, isLoading };
}

export { useLogin };
