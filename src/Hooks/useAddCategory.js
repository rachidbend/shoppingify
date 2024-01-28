import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCategory as addCategoryAPI } from '../services/apiItems';
import { useUser } from './useUser';
import { useGetCategories } from './useGetCategories';

function useAddCategory() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { categories } = useGetCategories();
  const {
    mutate: addCategory,
    isLoading,
    error,
  } = useMutation({
    mutationFn: category =>
      addCategoryAPI({ userId: user.id, allCategories: categories, category }),
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
