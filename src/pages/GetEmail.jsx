import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useForgotPassword } from '../Hooks/useForgotPassword';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const StyledGetEmail = styled.div`
  height: 100vh;
  width: 100%;

  background-color: var(--color-background);
  font-family: var(--font-main);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background-color: var(--color-white);
  border-radius: 2.4rem;
  box-shadow: var(--shadow-100);
  border: 1px solid var(--color-accent);
  padding: 4rem;
`;

const Title = styled.h2`
  color: var(--color-title);
  font-size: 2.6rem;
  font-weight: 500;
  margin-bottom: 5.6rem;
`;

const Input = styled.input`
  color: var(--color-title);
  font-size: 1.4rem;
  font-weight: 500;
  background-color: transparent;
  border-radius: 1.2rem;
  border: 0.2rem solid var(--color-grey-200);
  padding: 2.16rem 1.76rem;
  transition: border 260ms ease-in-out;
  outline: none;

  width: 38rem;

  &::placeholder {
    color: var(--color-grey-200);
    font-family: var(--font-main);
  }

  &:focus {
    border: 0.2rem solid var(--color-accent);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
`;

const Save = styled.input`
  padding: 1.96rem 2.32rem 1.96rem 2.42rem;
  color: var(--color-white);
  font-size: 1.6rem;
  font-weight: 700;
  border-radius: 1.2rem;
  background-color: var(--color-accent);
  text-transform: capitalize;

  border: 0.2rem solid var(--color-accent);
  cursor: pointer;
  transition: color 260ms ease-in-out, background 260ms ease-in-out;

  &:hover {
    background-color: transparent;
    color: var(--color-accent);
  }
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 4.8rem;
`;

function GetEmail() {
  // Initialize react-hook-form
  const { register, handleSubmit, reset } = useForm();

  // Use the useForgotPassword hook to handle forgot password functionality
  const { forgotPassword, error } = useForgotPassword();

  const navigate = useNavigate();

  // Function to handle form submission
  function onSubmit(data) {
    // Return if data is empty
    if (!data) return;
    // Call forgotPassword function with email and callback options
    forgotPassword(data.email, {
      onSuccess: () => {
        // Reset form on success
        reset();
        toast.success('Check your email!', {
          duration: 10000,
          style: {
            fontSize: '2rem',
          },
        });
        navigate('/password-check');
      },
      onError: error => toast.error(error.message),
    });
  }

  // Show error toast if there's an error
  if (error) toast.error(error.message);

  return (
    <StyledGetEmail>
      <Container>
        <Title>Enter your email</Title>
        {/* Form for entering email */}
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <Input
              placeholder="your email"
              type="email"
              {...register('email', {
                required: true,
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              })}
            />
          </InputContainer>

          {/* Button to submit form */}
          <ButtonContainer>
            <Save type="submit" value={'Save'} />
          </ButtonContainer>
        </form>
      </Container>
    </StyledGetEmail>
  );
}

export default GetEmail;
