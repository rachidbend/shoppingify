import { useQuery } from '@tanstack/react-query';
import { getItemDetails } from '../services/apiItems';

// Custom hook to fetch details of a specific item
function useGetItemDetails(itemId) {
  const {
    data: itemDetails, // Item details data fetched from the query
    isLoading,
    error,
  } = useQuery({
    // Unique query key to identify the query
    queryKey: ['item_details', itemId],
    // Function to fetch details of the specific item with the provided itemId
    queryFn: () => getItemDetails(itemId),
  });

  // Return item details data, loading state, and error state
  return { itemDetails, isLoading, error };
}

export { useGetItemDetails };
