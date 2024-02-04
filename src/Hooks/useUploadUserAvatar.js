import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadUserAvatar } from '../services/apiItems';
import toast from 'react-hot-toast';
import { useUpdateAvatar } from './useUpdateAvatar';

function useUploadUserAvatar() {
  const queryClient = useQueryClient();
  const { updateAvatar } = useUpdateAvatar();

  const {
    mutate: uploadAvatar,
    error,
    isPending,
  } = useMutation({
    mutationFn: file => uploadUserAvatar(file),
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries(['profile']);
      toast.success('Avatar image was uploaded successfuly!');
      // https://noghsukxfznxlmhenbko.supabase.co/storage/v1/object/public/
      updateAvatar({
        url: `https://noghsukxfznxlmhenbko.supabase.co/storage/v1/object/public/user_avatar/${data.path}`,
      });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { uploadAvatar, error, isPending };
}
export { useUploadUserAvatar };
