import { useQuery } from '@tanstack/react-query';
import { getAllAvatars } from '../services/apiItems';

function useGetAllAvatars() {
  const {
    data: avatars,
    isLoading,
    error,
  } = useQuery({ queryKey: ['avatars'], queryFn: getAllAvatars });

  return { avatars, isLoading, error };
}

export { useGetAllAvatars };
