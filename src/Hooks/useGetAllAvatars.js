import { useQuery } from '@tanstack/react-query';
import { getAllAvatars } from '../services/apiItems';

// Custom hook to fetch all avatars provided by the App
function useGetAllAvatars() {
  const {
    data: avatars,
    isLoading,
    error,
  } = useQuery({
    // Unique query key to identify the query
    queryKey: ['avatars'],
    // Function to fetch all avatars
    queryFn: getAllAvatars,
  });

  // Return avatars data, loading state, and error state
  return { avatars, isLoading, error };
}

export { useGetAllAvatars };
