import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutAPI } from '../services/apiAuth';
import toast from 'react-hot-toast';

function useLogout() {
  const queryClient = useQueryClient();

  const { mutate: logout, error } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success('Logout successfull!');
    },
    onError: error => {
      toast.error(error.message);
      throw new Error(error.message);
    },
  });
  return { logout, error };
}

export { useLogout };
