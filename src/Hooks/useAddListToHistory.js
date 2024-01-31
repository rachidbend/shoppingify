import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { addListToHistory } from '../services/apiItems';
import { useUpdateShoppingListName } from './useUpdateShoppingListName';
import { useUpdateShoppingList } from './useUpdateShoppingList';
import { useUser } from './useUser';

function useAddListToHistory() {
  const queryClient = useQueryClient();
  const { user } = useUser();
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
    mutationFn: ({ userId, shoppingHistory, list }) =>
      addListToHistory({ userId, shoppingHistory, list }),
    onSuccess: () => {
      console.log('on add to history success');
      updateShoppingList({
        id: 1,
        oldList: [],
        item: null,
        shoppingList: {
          id: 1,
          name: '',
          items: [],
          is_completed: false,
          is_canceled: false,
        },
      });
    },
    onSettled: () => {
      updateListName({ id: 1, listName: '', reset: true });
      queryClient.invalidateQueries('shopping_list');
    },
    onError: error => {
      throw new Error(error.message);
    },
  });

  return {
    uploadList,
    isLoading,
    error,
  };
}

export { useAddListToHistory };
