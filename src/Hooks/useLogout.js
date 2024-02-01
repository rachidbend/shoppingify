import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutAPI } from '../services/apiAuth';

function useLogout() {
  const queryClient = useQueryClient();

  const { mutate: logout, error } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    },
    onError: error => {
      throw new Error(error.message);
    },
  });
  return { logout, error };
}

export { useLogout };
