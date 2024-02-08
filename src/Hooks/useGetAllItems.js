import { useQuery } from '@tanstack/react-query';
import { getAllItems } from '../services/apiItems';

// Custom hook to fetch all items
function useGetAllItems() {
  const {
    data: items, // Items data fetched from the query
    isLoading,
    error,
  } = useQuery({
    // Unique query key to identify the items query
    queryKey: ['items'],
    // Function to fetch all items
    queryFn: getAllItems,
  });

  // Return items data, loading state, and error state
  return { items, isLoading, error };
}

export { useGetAllItems };
