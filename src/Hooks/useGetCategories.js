import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../services/apiItems';

// Custom hook to fetch all categories
function useGetCategories() {
  const {
    data: categories, // Categories data fetched from the query
    isLoading,
    error,
  } = useQuery({
    // Unique query key to identify the query
    queryKey: ['categories'],
    // Function to fetch all categories
    queryFn: getAllCategories,
  });

  // Return categories data, loading state, and error state
  return { categories, isLoading, error };
}

export { useGetCategories };
