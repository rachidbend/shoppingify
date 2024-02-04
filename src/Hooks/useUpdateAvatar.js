import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAvatar as updateAvatarAPI } from '../services/apiItems';
import { useUser } from './useUser';
import toast from 'react-hot-toast';

function useUpdateAvatar() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const {
    mutate: updateAvatar,
    error,
    isPending,
  } = useMutation({
    mutationFn: ({ url }) => updateAvatarAPI({ userId: user?.id, url }),
    onSuccess: () => {
      toast.success('Avatar image updated succussfuly!');
      queryClient.invalidateQueries('profile');
    },
  });

  return { updateAvatar, error, isPending };
}

export { useUpdateAvatar };
