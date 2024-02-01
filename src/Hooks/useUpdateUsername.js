import { useMutation } from '@tanstack/react-query';
import { updateUsername as updateUsernameAPI } from '../services/apiAuth';
import { useUser } from './useUser';

function useUpdateUsername() {
  const { user } = useUser();

  const { mutate: updateUsername, error } = useMutation({
    mutationFn: ({ username }) =>
      updateUsernameAPI({ userId: user?.id, username }),
  });

  return { updateUsername, error };
}

export { useUpdateUsername };
