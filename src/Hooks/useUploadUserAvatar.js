import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadUserAvatar } from '../services/apiItems';
import toast from 'react-hot-toast';
import { useUpdateAvatar } from './useUpdateAvatar';

// Custom hook to handle uploading user avatar
function useUploadUserAvatar() {
  // Hooks for cache management and avatar update
  const queryClient = useQueryClient();
  const { updateAvatar } = useUpdateAvatar();

  const {
    mutate: uploadAvatar, // Function to call to upload avatar
    error,
    isPending,
  } = useMutation({
    mutationFn: file => uploadUserAvatar(file),

    onSuccess: data => {
      // Display success toast notification
      toast.success('Avatar image was uploaded!');
      // Update user avatar with the uploaded image URL
      updateAvatar({
        url: `https://noghsukxfznxlmhenbko.supabase.co/storage/v1/object/public/user_avatar/${data.path}`,
      });
    },

    onSettled: () => {
      // Invalidate 'profile' query to refresh user profile data
      queryClient.invalidateQueries(['profile']);
    },
    onError: error => {
      // Display error toast notification
      toast.error(error.message);

      // Throw error for error boundary or further handling
      throw new Error(error.message);
    },
  });

  return { uploadAvatar, error, isPending };
}

export { useUploadUserAvatar };
