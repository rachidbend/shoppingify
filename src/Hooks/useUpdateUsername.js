import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUsername as updateUsernameAPI } from '../services/apiAuth';
import { useUser } from './useUser';
import toast from 'react-hot-toast';

function useUpdateUsername() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { mutate: updateUsername, error } = useMutation({
    mutationFn: ({ username }) =>
      updateUsernameAPI({ userId: user?.id, username }),
    onSuccess: () => {
      toast.success('Usename updated successfully!');
      queryClient.invalidateQueries(['profile']);
    },
    onError: error => {
      toast.error(error.message);
      throw new Error(error.message);
    },
  });

  return { updateUsername, error };
}

export { useUpdateUsername };
