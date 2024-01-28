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
      updateShoppingList({
        userId: user.id,
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
      updateListName({ id: 1, listName: '' });
    },
    onSettled: () => {
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
