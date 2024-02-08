import { useState } from 'react';
import styled from 'styled-components';
import { MdRemoveRedEye } from 'react-icons/md';
import { useNavigate } from 'react-router';

import { useUpdateUser } from '../Hooks/useUpdateUser';
import { useForm } from 'react-hook-form';
import { useUser } from '../Hooks/useUser';
import Spinner from '../UI/Spinner';

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

const Send = styled.input`
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
  // State variables to manage password visibility
  const [isShow, setIsShow] = useState(false);
  const [isShowSecond, setIsShowSecond] = useState(false);

  // Hooks for form handling and navigation
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const { user, isLoading } = useUser();

  const { updateUser } = useUpdateUser();

  // Function to handle form submission
  function onSbmit(data) {
    // Return if data is empty
    if (!data) return;
    // Check if password matches confirm password
    // If passwords match, update user with new password
    if (data.password === data.confirm) updateUser({ password: data.password });
    reset();
  }

  if (isLoading) return <Spinner />;

  console.log(user);

  return (
    <StyledResetPassword>
      <Container>
        <Title>Reset your password</Title>
        {/* Form for resetting password */}
        <form onSubmit={handleSubmit(onSbmit)}>
          {/* Input field for new password */}
          <InputContainer>
            <Input
              placeholder="New password"
              type={isShow ? 'text' : 'password'}
              {...register('password', { required: true, minLength: 6 })}
            />

            {/* Button to toggle password visibility */}
            <IconContainer
              onClick={() => {
                setIsShow(!isShow);
              }}
            >
              <EyeIcon />
            </IconContainer>
          </InputContainer>

          {/* Input field for confirming new password */}
          <InputContainer>
            <Input
              placeholder="Confirm password"
              type={isShowSecond ? 'text' : 'password'}
              {...register('confirm', { required: true, minLength: 6 })}
            />

            {/* Button to toggle password visibility */}
            <IconContainer
              onClick={() => {
                setIsShowSecond(!isShowSecond);
              }}
            >
              <EyeIcon />
            </IconContainer>
          </InputContainer>

          {/* Button container with Log In and Send buttons */}
          <ButtonContainer>
            {/* Log In button to navigate to login page */}
            <LoginButton onClick={() => navigate('/login', { replace: true })}>
              Log In
            </LoginButton>
            {/* Submit button to reset password */}
            <Send type="submit" value={'Send'} />
          </ButtonContainer>
        </form>
      </Container>
    </StyledResetPassword>
  );
}

export default ResetPassword;
