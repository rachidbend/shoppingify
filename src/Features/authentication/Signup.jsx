import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useSignup } from '../../Hooks/useSignup';
import toast, { Toaster } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { useSigninWithGoogle } from '../../Hooks/useSigninWithGoogle';

const StyledLogin = styled.div`
  height: 100vh;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-background);
  font-family: var(--font-main);

  @media screen and (max-width: 480px) {
    padding: 2.4rem;
  }
`;

const Container = styled.div`
  background-color: var(--color-white);
  border-radius: 2.4rem;
  box-shadow: var(--shadow-100);
  padding: 4rem;
  width: 38.9rem;
`;

const Label = styled.label`
  color: var(--color-title);

  font-size: 1.4rem;
  display: inline-block;
  font-weight: 500;
  margin-bottom: 0.8rem;
`;

const Input = styled.input`
  color: var(--color-title);
  font-size: 1.4rem;
  font-weight: 500;
  background-color: transparent;
  border-radius: 1.2rem;
  border: 0.2rem solid var(--color-grey-200);
  padding: 2.16rem 1.76rem;
  outline: none;
  margin-bottom: 1.8rem;

  transition: border var(--transition-input);

  &::placeholder {
    color: var(--color-grey-200);
    font-family: var(--font-main);
  }

  &:focus,
  &:hover {
    border: 0.2rem solid var(--color-accent);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const Title = styled.h2`
  color: var(--color-black);

  font-size: 2.4rem;
  margin-bottom: 3.38rem;
  font-weight: 500;
  text-align: center;
`;

const SignupButton = styled.input`
  padding: 1.4rem 2.32rem 1.4rem 2.42rem;
  margin-top: 1.6rem;
  color: var(--color-white);
  font-size: 1.6rem;
  font-weight: 700;
  border-radius: 1.2rem;
  background-color: var(--color-accent);
  text-transform: capitalize;
  display: inline-block;
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

const OrContainer = styled.div`
  border-bottom: 1px solid var(--color-grey-200);
  position: relative;
  margin-top: 3.6rem;
  margin-bottom: 4.8rem;
`;
const OrText = styled.p`
  color: var(--color-grey-400);
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  background-color: var(--color-white);
  position: absolute;
  bottom: 0;
  padding: 0.4rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 0.6rem;
  left: 50%;
  transform: translate(-50%, 50%);
`;

const LoginButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;

  font-size: 1.4rem;
  color: var(--color-grey-100);
  font-weight: 500;
  text-align: center;
  padding: 0.2rem 0;
  margin-left: 0.4rem;
  border-bottom: 1px solid var(--color-grey-100);
  transition: color var(--transition-button-text);

  &:hover {
    color: var(--color-accent);
    border-bottom: 1px solid var(--color-accent);
  }
`;

const LoginText = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-400);
  font-weight: 500;
  text-align: center;

  display: flex;
  align-items: baseline;
  justify-content: center;
`;

const OtherLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 2.4rem;
`;

const OtherLogin = styled.div`
  padding: 1.1rem 2.95rem;
  border: 1px solid var(--color-grey-200);
  box-shadow: var(--shadow-100);
  text-align: center;
  width: 20rem;
  border-radius: 1.2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  cursor: pointer;
  margin-bottom: 1.2rem;

  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-black);
`;

const GoogleIcon = styled(FcGoogle)`
  height: 2.4rem;
  width: 2.4rem;
`;

// Component for user registration.
function Signup() {
  // Form validation using react-hook-form
  const { register, handleSubmit } = useForm();
  // Navigation hook for redirection
  const navigate = useNavigate();
  // Custom hook for user registration
  const { signup, isLoading, error } = useSignup();
  // Custom hook for Google authentication
  const { signInWithGoogle } = useSigninWithGoogle();

  // Form submission handler
  function onSubmit(data) {
    // Check if password and confirm password match
    if (data.password === data.confirm)
      // Call signup function if passwords match
      signup(
        { email: data.email, password: data.password },
        {
          onSuccess: () => {
            // Redirect to confirmation page after successful signup
            navigate('/confirm');
          },
          onError: error => {
            // Display error toast if signup fails
            toast.error(error.message);
            throw new Error(error.message);
          },
        }
      );
  }

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
            duration: 5000,
          },
        }}
      />
      <Container>
        {/* Signup title */}
        <Title>Signup</Title>

        {/* Signup form */}
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

          {/* Confirm password input */}
          <Label>Confirm password</Label>
          <Input
            type="password"
            placeholder="confirm password"
            {...register('confirm', {
              required: true,
              minLength: 6,
              maxLength: 16,
            })}
          />
          {/* Login button, if user is already signed up */}
          <SignupButton type="submit" value="SIGNUP" />
        </Form>

        {/* Or sepirator */}
        <OrContainer>
          <OrText>OR</OrText>
        </OrContainer>

        {/* Google signup button */}
        <OtherLoginContainer>
          <OtherLogin onClick={signInWithGoogle}>
            <GoogleIcon />
            Google
          </OtherLogin>
        </OtherLoginContainer>

        {/* Login link */}
        <LoginText>
          already have an account?
          <LoginButton disabled={isLoading} onClick={() => navigate('/login')}>
            LOGIN
          </LoginButton>
        </LoginText>
        {/* Error message display */}
        {error && <p>{error.message}</p>}
      </Container>
    </StyledLogin>
  );
}

export default Signup;
