import { useQuery } from '@tanstack/react-query';
import { getHistoryList } from '../services/apiItems';

// Custom hook to fetch a specific shopping list from the history
function useGetHistoryList(id) {
  const {
    data: list, // List data fetched from the query
    isLoading,
    error,
  } = useQuery({
    // Unique query key to identify the specific list
    queryKey: ['shopping_history', id],
    // Function to fetch the specific shopping history list with the provided id
    queryFn: () => getHistoryList(id),
  });

  // Return list data, loading state, and error state
  return { list, isLoading, error };
}

export { useGetHistoryList };
