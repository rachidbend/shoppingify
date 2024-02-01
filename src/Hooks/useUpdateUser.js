import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser as updateUserAPI } from '../services/apiAuth';
import toast from 'react-hot-toast';

function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, error } = useMutation({
    mutationFn: ({ email, password }) => updateUserAPI({ email, password }),
    onSuccess: () => {
      toast.success('User data updated successfully');
      queryClient.invalidateQueries(['user']);
    },
    onError: error => {
      toast.error(error.message);
      throw new Error(error.message);
    },
  });

  return {
    updateUser,
    error,
  };
}

export { useUpdateUser };
