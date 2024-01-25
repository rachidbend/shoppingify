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
`;
const Container = styled.div`
  margin-bottom: 3.56rem;
  display: flex;
  align-items: start;
  gap: 7rem;
`;
const ButtonContainer = styled.div`
  text-align: right;
`;

const Yes = styled.button`
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

function Modal({ onClose, onConfirm }) {
  return createPortal(
    <OverLay>
      <StyledModel>
        <Container>
          <Text>
            Are you sure that you want to <br /> cancel this list?
          </Text>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </Container>
        <ButtonContainer>
          <Cancel onClick={onClose}>cancel</Cancel>
          <Yes onClick={onConfirm}>Yes</Yes>
        </ButtonContainer>
      </StyledModel>
    </OverLay>,
    document.body
  );
}

export default Modal;
