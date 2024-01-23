import { useQuery } from '@tanstack/react-query';
import { getHistoryList } from '../services/apiItems';

function useGetHistoryList(id) {
  const {
    data: list,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['shopping_history', id],
    queryFn: () => getHistoryList(id),
  });

  return { list, isLoading, error };
}

export { useGetHistoryList };
