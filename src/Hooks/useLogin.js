import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginAPI } from '../services/apiAuth';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: user => {
      queryClient.setQueryData(['user'], user);
      navigate('/items');
      queryClient.invalidateQueries();
      toast.success('Login successfull!');

      // check if there is a profile with the same id as the user id

      // if there is one, then do nothing
      // if there is none, then create one
    },
    onError: error => {
      toast.error(error.message);
      throw new Error(error.message);
    },
  });

  return { login, isLoading };
}

export { useLogin };
