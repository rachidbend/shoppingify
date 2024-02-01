import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../services/apiAuth';

function useGetUserProfile({ userId }) {
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getUserProfile({ userId }),
  });

  return {
    profile,
    isLoading,
    error,
  };
}

export { useGetUserProfile };
