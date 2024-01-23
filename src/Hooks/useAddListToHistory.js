import { useMutation } from '@tanstack/react-query';
import { addListToHistory } from '../services/apiItems';

function useAddListToHistory() {
  const {
    mutate: uploadList,
    isLoading,
    error,
  } = useMutation({
    mutationFn: list => addListToHistory(list),
  });

  return {
    uploadList,
    isLoading,
    error,
  };
}

export { useAddListToHistory };
