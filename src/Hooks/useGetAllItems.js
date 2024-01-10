import { useQuery } from '@tanstack/react-query';
import { getAllItems } from '../services/apiItems';

function useGetAllItems() {
  const {
    data: items,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['items'],
    queryFn: getAllItems,
  });

  return { items, isLoading, error };
}

export { useGetAllItems };
