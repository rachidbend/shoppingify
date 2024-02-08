import { useQuery } from '@tanstack/react-query';
import { getShoppingList } from '../services/apiItems';

// Custom hook to fetch the shopping list
function useGetShoppingList() {
  const {
    data: shoppingList, // Shopping list data fetched from the query
    isLoading,
    error,
  } = useQuery({
    // Unique query key to identify the query
    queryKey: ['shopping_list'],
    // Function to fetch the shopping list
    queryFn: getShoppingList,
  });

  // Return shopping list data, loading state, and error state
  return { shoppingList, isLoading, error };
}

export { useGetShoppingList };
