import { useState } from 'react';
import styled from 'styled-components';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { MdRemoveRedEye } from 'react-icons/md';
import { useNavigate } from 'react-router';

const StyledResetPassword = styled.div`
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
const IconContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 1.2rem;
  transform: translateY(-50%);
  padding: 0.4rem;

  &:hover svg {
    color: var(--color-gray-100);
  }
`;
const EyeIcon = styled(MdRemoveRedEye)`
  height: 2.4rem;
  width: 2.4rem;
  color: var(--color-gray-200);
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

const LoginButton = styled.button`
  color: var(--color-title);

  font-size: 1.6rem;
  padding: 2.06rem 2.42rem 2.06rem 2.52rem;
  font-weight: 700;
  transition: color 260ms ease-in-out;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    color: var(--color-gray-300);
  }
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 4.8rem;
`;

function ResetPassword() {
  const [isShow, setIsShow] = useState(false);
  const [isShowSecond, setIsShowSecond] = useState(false);

  const navigate = useNavigate();

  return (
    <StyledResetPassword>
      <Container>
        <Title>Reset your password</Title>
        <form action="">
          <InputContainer>
            <Input
              placeholder="New password"
              type={isShow ? 'text' : 'password'}
            />

            <IconContainer
              onClick={() => {
                setIsShow(!isShow);
              }}
            >
              <EyeIcon />
            </IconContainer>
          </InputContainer>
          <InputContainer>
            <Input
              placeholder="Confirm password"
              type={isShowSecond ? 'text' : 'password'}
            />

            <IconContainer
              onClick={() => {
                setIsShowSecond(!isShowSecond);
              }}
            >
              <EyeIcon />
            </IconContainer>
          </InputContainer>
          <ButtonContainer>
            <LoginButton onClick={() => navigate('/login', { replace: true })}>
              Log In
            </LoginButton>
            <Save type="submit" value={'Save'} />
          </ButtonContainer>
        </form>
      </Container>
    </StyledResetPassword>
  );
}

export default ResetPassword;
