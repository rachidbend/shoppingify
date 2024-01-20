import { useQuery } from '@tanstack/react-query';
import { getItemDetails } from '../services/apiItems';

function useGetItemDetails(itemId) {
  const {
    data: itemDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['item_details', itemId],
    queryFn: () => getItemDetails(itemId),
  });

  return { itemDetails, isLoading, error };
}

export { useGetItemDetails };
