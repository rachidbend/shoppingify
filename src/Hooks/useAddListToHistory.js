import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { addListToHistory } from '../services/apiItems';
import { useUpdateShoppingListName } from './useUpdateShoppingListName';
import { useUpdateShoppingList } from './useUpdateShoppingList';

function useAddListToHistory() {
  const queryClient = useQueryClient();
  const {
    updateListName,
    isLoading: isUpdatingName,
    error: errorName,
  } = useUpdateShoppingListName();
  const {
    updateShoppingList,
    isLoading: isUpdatingListItem,
    error: listItemError,
  } = useUpdateShoppingList();

  const {
    mutate: uploadList,
    isLoading,
    error,
  } = useMutation({
    mutationFn: list => addListToHistory(list),
    onSuccess: () => {
      if (isUpdatingName) return;
      updateListName({ id: 1, listName: '' });
      updateShoppingList({
        id: 1,
        oldList: [],
        item: null,
      });

      queryClient.invalidateQueries('shopping_list');
    },
  });

  return {
    uploadList,
    isLoading,
    error,
  };
}

export { useAddListToHistory };
