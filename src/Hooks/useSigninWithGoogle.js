import { useMutation } from '@tanstack/react-query';
import { signInGoogle } from '../services/apiAuth';

function useSigninWithGoogle() {
  const {
    mutate: signInWithGoogle,
    error,
    isPending,
  } = useMutation({
    mutationFn: signInGoogle,
  });

  return { signInWithGoogle, error, isPending };
}

export { useSigninWithGoogle };
