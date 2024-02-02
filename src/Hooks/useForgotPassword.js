import { useMutation } from '@tanstack/react-query';
import { forgotPassword as forgotPasswordAPI } from '../services/apiAuth';

function useForgotPassword() {
  const {
    mutate: forgotPassword,
    error,
    data,
  } = useMutation({
    mutationFn: email => forgotPasswordAPI(email),
  });

  return {
    forgotPassword,
    error,
    data,
  };
}

export { useForgotPassword };
