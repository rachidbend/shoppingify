import { useQuery } from '@tanstack/react-query';
import { getShoppingList } from '../services/apiItems';

function useGetShoppingList() {
  const {
    data: shoppingList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['shopping_list'],
    queryFn: getShoppingList,
  });

  return { shoppingList, isLoading, error };
}

export { useGetShoppingList };
