import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/apiAuth';

function useUser() {
  const {
    data: user,
    isLoading,
    error,
    fetchStatus,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return {
    user,
    isLoading,
    error,
    fetchStatus,
    isAuthenticated: user?.role === 'authenticated',
  };
}

export { useUser };
