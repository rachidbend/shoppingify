import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useLogin } from '../../Hooks/useLogin';
import toast, { Toaster } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { useSigninWithGoogle } from '../../Hooks/useSigninWithGoogle';

const StyledLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: var(--color-background);
  font-family: var(--font-main);

  @media screen and (max-width: 480px) {
    padding: 2.4rem;
  }
`;

const Container = styled.div`
  width: 38.9rem;
  background-color: var(--color-white);
  border-radius: 2.4rem;
  padding: 4rem;
  box-shadow: var(--shadow-100);
`;

const Label = styled.label`
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-title);
  margin-bottom: 0.8rem;
`;

const Input = styled.input`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-title);
  background-color: transparent;
  border-radius: 1.2rem;
  border: 0.2rem solid var(--color-grey-200);
  padding: 2.16rem 1.76rem;
  out;
  outline: none;
  margin-bottom: 1.8rem;

  transition: border var(--transition-input);


  &::placeholder {
    font-family: var(--font-main);
    color: var(--color-grey-200);
  }
  &:focus, &:hover {
    border: 0.2rem solid var(--color-accent);
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

const Title = styled.h2`
  font-size: 2.4rem;
  margin-bottom: 3.38rem;
  font-weight: 500;
  color: var(--color-black);
  text-align: center;
`;

const LoginButton = styled.input`
  display: inline-block;
  font-size: 1.6rem;
  font-weight: 700;
  text-transform: capitalize;
  color: var(--color-white);
  padding: 1.4rem 2.32rem 1.4rem 2.42rem;
  margin-top: 1.6rem;
  border-radius: 1.2rem;
  background-color: var(--color-accent);
  border: 0.2rem solid var(--color-accent);
  cursor: pointer;
  transition: background-color var(--transition-button),
    color var(--transition-button);

  &:hover {
    background-color: transparent;
    color: var(--color-accent);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ForgotPasswordContainer = styled.div`
  text-align: right;
`;

const ForgotPassword = styled.button`
  font-size: 1.2rem;
  font-weight: 500;
  background: none;
  color: var(--color-grey-400);
  border: none;
  outline: none;
  align-self: flex-end;
  margin-top: 0.6rem;
  margin-left: auto;
  padding: 0.4rem 0 0.4rem 0.4rem;
  cursor: pointer;

  transition: color var(--transition-button-text);
  &:hover {
    color: var(--color-accent);
  }
`;

const OrContainer = styled.div`
  position: relative;
  border-bottom: 1px solid var(--color-grey-200);
  margin-top: 3.6rem;
  margin-bottom: 4.8rem;
`;
const OrText = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-grey-400);
  text-align: center;
  background-color: var(--color-white);
  padding: 0.4rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 0.6rem;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
`;

const SignupButton = styled.button`
  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
  color: var(--color-grey-100);
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0.2rem 0;
  margin-left: 0.4rem;
  border-bottom: 1px solid var(--color-grey-100);

  transition: color var(--transition-button-text),
    border var(--transition-button-text);
  &:hover {
    color: var(--color-accent);
    border-bottom: 1px solid var(--color-accent);
  }
`;

const SignupText = styled.p`
  display: flex;
  align-items: baseline;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
  color: var(--color-grey-400);
`;

const OtherLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2.4rem;
`;

const OtherLogin = styled.div`
  width: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-black);
  padding: 1.1rem 2.95rem;
  border: 1px solid var(--color-grey-200);
  box-shadow: var(--shadow-100);
  text-align: center;
  border-radius: 1.2rem;
  cursor: pointer;
  margin-bottom: 1.2rem;
`;

const GoogleIcon = styled(FcGoogle)`
  height: 2.4rem;
  width: 2.4rem;
`;

// Component for user login with email and password, or through Google authentication.
function Login() {
  // Form validation using react-hook-form
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: 'example@gmail.com',
      password: '123456789',
    },
  });
  // Navigation hook for redirection
  const navigate = useNavigate();
  // Custom hook for email and password login
  const { login, isLoading: isLoggingIn } = useLogin();
  // Custom hook for Google authentication
  const { signInWithGoogle, error } = useSigninWithGoogle();

  // Form submission handler
  function onSubmit(data) {
    login(data, {
      onSettled: () => {
        // Reset form after submission
        reset();
      },
    });
  }

  // Display error toast if authentication fails
  if (error) toast.error(error.message);

  return (
    <StyledLogin>
      {/* Global toast notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              fontSize: '1.2rem',
              fontFamily: 'var(--font-main)',
              fontWeight: 500,
            },
          },
          error: {
            duration: 10000,
          },
        }}
      />
      <Container>
        {/* Login title */}
        <Title>Login</Title>
        {/* Login form */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Email input */}
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="email"
            {...register('email', {
              required: true,
              pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            })}
          />

          {/* Password input */}
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="password"
            {...register('password', {
              required: true,
              minLength: 6,
              maxLength: 16,
            })}
          />

          {/* Login button */}
          <LoginButton disabled={isLoggingIn} type="submit" value="LOGIN" />
        </Form>
        {/* Forgot password link */}
        <ForgotPasswordContainer>
          <ForgotPassword onClick={() => navigate('/get-email')}>
            Forgot password?
          </ForgotPassword>
        </ForgotPasswordContainer>

        {/* Or sepirator */}
        <OrContainer>
          <OrText>OR</OrText>
        </OrContainer>

        {/* Google login button */}
        <OtherLoginContainer>
          <OtherLogin onClick={signInWithGoogle}>
            <GoogleIcon />
            Google
          </OtherLogin>
        </OtherLoginContainer>
        {/* Signup link */}
        <SignupText>
          need an account?
          <SignupButton onClick={() => navigate('/signup')}>
            SIGN UP
          </SignupButton>
        </SignupText>
      </Container>
    </StyledLogin>
  );
}

export default Login;

// this was used to add a trigger to add a profile whenever a new user was creaded, and that new profile will be linked with the user by the id of the user
/* 

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id, new.created_at, new.user_name, new.avatar, new.shopping_history, new.shopping_history, new.items, new.categories);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
  
*/
