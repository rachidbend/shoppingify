import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCategory as addCategoryAPI } from '../services/apiItems';

function useAddCategory() {
  const queryClient = useQueryClient();

  const {
    mutate: addCategory,
    isLoading,
    error,
  } = useMutation({
    mutationFn: category => addCategoryAPI(category),
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
    },
  });

  return {
    addCategory,
    isLoading,
    error,
  };
}

export { useAddCategory };
