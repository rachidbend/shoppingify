import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useSignup } from '../../Hooks/useSignup';

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

function Signup() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { signup, isLoading, error } = useSignup();

  function onSubmit(data) {
    if (data.password === data.confirm)
      signup({ email: data.email, password: data.password });
  }

  return (
    <StyledLogin>
      <Container>
        <Title>Signup</Title>
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

          <LoginButton type="submit" value="SIGNUP" />
        </Form>

        <OrContainer>
          <OrText>OR</OrText>
        </OrContainer>
        <SignupText>
          already have an account?
          <SignupButton disabled={isLoading} onClick={() => navigate('/login')}>
            LOGIN
          </SignupButton>
        </SignupText>
        {error && <p>{error.message}</p>}
      </Container>
    </StyledLogin>
  );
}

export default Signup;
