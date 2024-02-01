import { useMutation } from '@tanstack/react-query';
import { updateUser as updateUserAPI } from '../services/apiAuth';

function useUpdateUser() {
  const { mutate: updateUser, error } = useMutation({
    mutationFn: ({ email, password }) => updateUserAPI({ email, password }),
  });

  return {
    updateUser,
    error,
  };
}

export { useUpdateUser };
