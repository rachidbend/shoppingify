import { useNavigate } from 'react-router';
import styled from 'styled-components';

const StyledEmailConfirmation = styled.div`
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
  margin-bottom: 4.8rem;
`;

const Save = styled.button`
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
`;

const Paragraph = styled.div`
  color: var(--color-black);
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 4.8rem;
`;

// EmailConfirmation component renders a message to inform the user to check their inbox for a confirmation email.
// It also provides a button to navigate to the login page.
function CheckEmail() {
  const navigate = useNavigate();

  // Handle click event to navigate to the login page
  const handleLoginClick = () => {
    navigate('/login', { replace: true });
  };

  return (
    <StyledEmailConfirmation>
      <Container>
        <Title>Reset password</Title>
        <Paragraph>
          Check your email inbox for a password reset email!{' '}
        </Paragraph>
        <ButtonContainer>
          <Save onClick={handleLoginClick}>Log In</Save>
        </ButtonContainer>
      </Container>
    </StyledEmailConfirmation>
  );
}

export default CheckEmail;
