import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../services/apiAuth';

// Custom hook to fetch user profile data
function useGetUserProfile({ userId }) {
  const {
    data: profile, // Profile data fetched from the query
    isLoading,
    error,
  } = useQuery({
    // Unique query key to identify the query
    queryKey: ['profile'],
    // Function to fetch the user profile with the provided userId
    queryFn: () => getUserProfile({ userId }),
  });

  // Return profile data, loading state, and error state
  return {
    profile,
    isLoading,
    error,
  };
}

export { useGetUserProfile };
