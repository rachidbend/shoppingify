import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../services/apiItems';

function useGetCategories() {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });

  return { categories, isLoading, error };
}

export { useGetCategories };
