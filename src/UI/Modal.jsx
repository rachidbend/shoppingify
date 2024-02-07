import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

const StyledModel = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: var(--color-white);
  border-radius: 2.4rem;
  padding: 1.56rem 3.01rem 2.93rem 3.85rem;

  @media screen and (max-width: 1024px) {
    padding: 1.56rem 3.01rem 2.93rem 3.85rem;
  }

  @media screen and (max-width: 780px) {
    width: 70%;
  }

  @media screen and (max-width: 480px) {
    padding: 1rem 2.01rem 2rem 2.85rem;
    width: 80%;
  }
`;

const OverLay = styled.div`
  background: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
`;

const CloseIcon = styled(MdClose)`
  width: 2.4rem;
  height: 2.4rem;
  color: var(--color-gray-400);
  cursor: pointer;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
`;
const Text = styled.p`
  color: var(--color-title);
  font-family: var(--font-main);
  font-size: 2.4rem;
  font-weight: 500;
  margin-top: 1.76rem;

  @media screen and (max-width: 1024px) {
  }

  @media screen and (max-width: 780px) {
  }

  @media screen and (max-width: 480px) {
    font-size: 1.8rem;
  }
`;
const Container = styled.div`
  margin-bottom: 3.56rem;
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 7rem;

  @media screen and (max-width: 1024px) {
    gap: 4rem;
  }

  @media screen and (max-width: 780px) {
    gap: 2.4rem;
  }

  @media screen and (max-width: 480px) {
    gap: 1.2rem;
  }
`;
const ButtonContainer = styled.div`
  text-align: right;
`;

const Confirm = styled.button`
  padding: 2.06rem 3.07rem;
  color: var(--color-white);
  font-size: 1.6rem;
  font-weight: 700;
  border-radius: 1.2rem;
  background-color: var(--color-red);
  text-transform: capitalize;

  border: 0.2rem solid var(--color-red);
  cursor: pointer;
  transition: color 260ms ease-in-out, background 260ms ease-in-out;
  &:hover {
    background-color: transparent;
    color: var(--color-red);
  }
`;
const Cancel = styled.button`
  color: var(--color-title);

  font-size: 1.6rem;
  padding: 2.06rem 3.07rem;
  font-weight: 700;
  transition: color 260ms ease-in-out;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    color: var(--color-gray-300);
  }
`;

const Break = styled.br`
  @media screen and (max-width: 780px) {
    display: none;
  }
`;

// Modal component displays a dialog box to prompt the user for confirmation.
// "onClose" Function to handle modal close action.
// "onConfirm" Function to handle modal confirm action.
function Modal({ onClose, onConfirm }) {
  // Render the modal using createPortal to ensure it's outside the main DOM hierarchy
  return createPortal(
    // Modal overlay to cover the entire viewport
    <OverLay>
      {/* Modal content */}
      <StyledModel>
        {/* Container for modal content */}
        <Container>
          {/* Text prompting the user */}
          <Text>
            Are you sure that you want to <Break /> cancel this list?
          </Text>
          {/* Close button to close the modal */}
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </Container>
        {/* Button container for confirmation options */}
        <ButtonContainer>
          {/* Cancel button */}
          <Cancel onClick={onClose}>cancel</Cancel>
          {/* Confirmation button */}
          <Confirm onClick={onConfirm}>Yes</Confirm>
        </ButtonContainer>
      </StyledModel>
    </OverLay>,
    // Render the modal as a direct child of the document body
    document.body
  );
}

export default Modal;
