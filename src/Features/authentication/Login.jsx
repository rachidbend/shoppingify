import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useLogin } from '../../Hooks/useLogin';
import { Toaster } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
// import { ImFacebook2 } from 'react-icons/im';
// import { FaXTwitter } from 'react-icons/fa6';
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
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.04);
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
  border: 0.2rem solid var(--color-gray-200);
  padding: 2.16rem 1.76rem;
  transition: border 260ms ease-in-out;
  outline: none;
  margin-bottom: 1.8rem;
  &::placeholder {
    color: var(--color-gray-200);
    font-family: var(--font-main);
  }

  &:focus {
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

const LoginButton = styled.input`
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
  transition: color 260ms ease-in-out, background 260ms ease-in-out;
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
  border: none;
  outline: none;
  color: var(--color-gray-400);
  align-self: flex-end;
  margin-top: 0.6rem;
  margin-left: auto;
  padding: 0.4rem 0 0.4rem 0.4rem;
  cursor: pointer;

  transition: color 200ms ease-out;
  &:hover {
    color: var(--color-accent);
  }
`;

const OrContainer = styled.div`
  border-bottom: 1px solid var(--color-gray-200);
  position: relative;
  margin-top: 3.6rem;
  margin-bottom: 4.8rem;
`;
const OrText = styled.p`
  color: var(--color-gray-400);
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  background-color: var(--color-white);
  position: absolute;
  bottom: 0;
  padding: 0.4rem;
  border: 1px solid var(--color-gray-200);
  border-radius: 0.6rem;
  left: 50%;
  transform: translate(-50%, 50%);
`;

const SignupButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;

  font-size: 1.4rem;
  color: var(--color-gray-100);
  font-weight: 500;
  text-align: center;
  padding: 0.2rem 0;
  margin-left: 0.4rem;
  border-bottom: 1px solid var(--color-gray-100);
  transition: color 200ms ease-out, border 200ms ease-out;
  &:hover {
    color: var(--color-accent);
    border-bottom: 1px solid var(--color-accent);
  }
`;

const SignupText = styled.p`
  font-size: 1.4rem;
  color: var(--color-gray-400);
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
  border: 1px solid var(--color-gray-200);
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.04);
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
// const FacebookIcon = styled(ImFacebook2)`
//   height: 2.4rem;
//   width: 2.4rem;
//   color: #316ff6;
// `;

// const TwitterIcon = styled(FaXTwitter)`
//   height: 2.4rem;
//   width: 2.4rem;
// `;

function Login() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { login, isLoading: isLoggingIn } = useLogin();
  const { signInWithGoogle, error } = useSigninWithGoogle();

  function onSubmit(data) {
    login(data, {
      onSettled: () => {
        reset();
      },
    });
  }

  return (
    <StyledLogin>
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
        <Title>Login</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="email"
            {...register('email', {
              required: true,
              pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            })}
          />
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

          <LoginButton disabled={isLoggingIn} type="submit" value="LOGIN" />
        </Form>
        <ForgotPasswordContainer>
          <ForgotPassword onClick={() => navigate('/get-email')}>
            Forgot password?
          </ForgotPassword>
        </ForgotPasswordContainer>

        <OrContainer>
          <OrText>OR</OrText>
        </OrContainer>

        <OtherLoginContainer>
          <OtherLogin onClick={signInWithGoogle}>
            <GoogleIcon />
            Google
          </OtherLogin>
        </OtherLoginContainer>
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
