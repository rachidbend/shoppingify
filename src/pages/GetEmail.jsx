import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useForgotPassword } from '../Hooks/useForgotPassword';
import toast from 'react-hot-toast';

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
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.04);
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
  border: 0.2rem solid var(--color-gray-200);
  padding: 2.16rem 1.76rem;
  transition: border 260ms ease-in-out;
  outline: none;

  width: 38rem;

  &::placeholder {
    color: var(--color-gray-200);
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
  const { register, handleSubmit, reset } = useForm();

  const { forgotPassword, error, data: forgotData } = useForgotPassword();

  function onSubmit(data) {
    console.log(data);
    if (!data) return;
    forgotPassword(data.email, {
      onSuccess: () => {
        reset();
      },
      onError: error => toast.error(error.message),
    });
  }

  return (
    <StyledGetEmail>
      <Container>
        <Title>Enter your email</Title>
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

          <ButtonContainer>
            <Save type="submit" value={'Save'} />
          </ButtonContainer>
        </form>
      </Container>
    </StyledGetEmail>
  );
}

export default GetEmail;
