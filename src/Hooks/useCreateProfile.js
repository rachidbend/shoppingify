import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProfile as createProfileAPI } from '../services/apiAuth';
import toast from 'react-hot-toast';

function useCreateProfile() {
  const queryClient = useQueryClient();

  const {
    mutate: createProfile,
    error,
    isPending,
  } = useMutation({
    mutationFn: userId => createProfileAPI(userId),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success('profile created!');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { createProfile, error, isPending };
}

export { useCreateProfile };
