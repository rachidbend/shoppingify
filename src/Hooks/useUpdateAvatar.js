import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAvatar as updateAvatarAPI } from '../services/apiItems';
import { useUser } from './useUser';
import toast from 'react-hot-toast';

// Custom hook to handle updating user avatar
function useUpdateAvatar() {
  // Hooks for user data and cache management
  const { user } = useUser();
  const queryClient = useQueryClient();

  const {
    mutate: updateAvatar, // Function to call to update user avatar
    error,
    isPending,
  } = useMutation({
    mutationFn: ({ url }) => updateAvatarAPI({ userId: user?.id, url }),

    // Display success toast notification
    onSuccess: () => {
      toast.success('Avatar updated!');
    },
    onSettled: () => {
      // Invalidate all queries to refresh data
      queryClient.invalidateQueries('profile');
    },
    onError: error => {
      // Display error toast notification
      toast.error(error.message);
      // Throw error for error boundary or further handling
      throw new Error(error.message);
    },
  });

  return { updateAvatar, error, isPending };
}

export { useUpdateAvatar };
