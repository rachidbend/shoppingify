import { useQuery } from '@tanstack/react-query';
import { getHistory } from '../services/apiItems';

function useGetHistory() {
  const {
    data: history,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['shopping_history'],
    queryFn: getHistory,
  });

  return { history, isLoading, error };
}

export { useGetHistory };
