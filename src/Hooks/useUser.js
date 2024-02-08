import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/apiAuth';

// Custom hook to retrieve user data
// This hook is used by ProtectedRoutes, and any other hookes or components that need acces to some data bout the user
function useUser() {
  // Retrieve user data using useQuery hook
  const {
    data: user,
    isLoading,
    error,
    fetchStatus,
  } = useQuery({
    // Key for the query cache
    queryKey: ['user'],
    // Function to fetch user data
    queryFn: getCurrentUser,
  });

  // Determine if the user is authenticated based on user's role
  const isAuthenticated = user?.role === 'authenticated';

  // Return user data, loading state, error state, fetch status, and authentication status
  return {
    user,
    isLoading,
    error,
    fetchStatus,
    isAuthenticated,
  };
}

export { useUser };
