import { useMutation } from '@tanstack/react-query';
import { signInGoogle } from '../services/apiAuth';

// Custom hook to handle signing in with Google
function useSigninWithGoogle() {
  const {
    mutate: signInWithGoogle, // Function to call to sign in with Google
    error,
    isPending,
  } = useMutation({
    // Function to call the signInGoogle API
    mutationFn: signInGoogle,
  });

  // Return signInWithGoogle mutation function, error state, and pending status
  return { signInWithGoogle, error, isPending };
}

export { useSigninWithGoogle };
