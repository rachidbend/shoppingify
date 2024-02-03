import { useQuery } from '@tanstack/react-query';
import { getProfiles } from '../services/apiAuth';

function useCheckProfile(userId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['check-profile'],
    queryFn: () => getProfiles(userId),
  });

  return { data, isLoading, error };
}

export { useCheckProfile };
