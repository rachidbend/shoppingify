import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSpinner = styled.span`
  box-sizing: border-box;
  position: relative;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;

  &:after,
  &:before {
    content: '';
    width: 24px;
    height: 24px;
    position: absolute;
    border-radius: 50%;
    background: var(--color-red);
    animation: spin 1s linear infinite;
    transform-origin: 0px 100%;
  }
  &:before {
    transform-origin: 0 50%;
    background: var(--color-blue);
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// Spinner component renders a loading spinner.
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Spinner() {
  return (
    // Container to center the spinner
    <Container>
      <SpinnerContainer>
        <StyledSpinner></StyledSpinner>
      </SpinnerContainer>
    </Container>
  );
}

export default Spinner;
