import { useQuery } from '@tanstack/react-query';
import { getHistory } from '../services/apiItems';

// Custom hook to fetch shopping history
function useGetHistory() {
  const {
    data: history, // History data fetched from the query
    isLoading,
    error,
  } = useQuery({
    // Unique query key to identify the query
    queryKey: ['shopping_history'],
    // Function to fetch shopping history
    queryFn: getHistory,
  });

  // Return history data, loading state, and error state
  return { history, isLoading, error };
}

export { useGetHistory };
