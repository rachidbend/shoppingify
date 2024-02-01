import styled from 'styled-components';
import { useLogout } from '../Hooks/useLogout';
import { useUser } from '../Hooks/useUser';
import Spinner from '../UI/Spinner';
import { useGetUserProfile } from '../Hooks/useGetUserProfile';
import { useState } from 'react';
import { PiUserCircle } from 'react-icons/pi';
import { MdEmail } from 'react-icons/md';
import { MdLock } from 'react-icons/md';
import { MdEditSquare } from 'react-icons/md';
import { useUpdateUser } from '../Hooks/useUpdateUser';
import { useUpdateUsername } from '../Hooks/useUpdateUsername';

const StyledAccount = styled.div`
  background-color: var(--color-background);
  height: 100%;

  display: flex;
  flex-direction: column;

  @media screen and (max-width: 480px) {
    padding: 0 1.25rem;
  }
`;

const Title = styled.h2`
  color: var(--color-title);
  font-size: 1.8rem;
  font-weight: 500;

  @media screen and (max-width: 480px) {
    margin-top: 3.85rem;
    margin-bottom: 1.8rem;
  }
`;
const Logout = styled.button`
  font-size: 1.4rem;
  color: var(--color-white);
  font-weight: 500;
  background-color: var(--color-shopping-add-item-background);
  border: 0.2rem solid var(--color-shopping-add-item-background);
  text-transform: uppercase;
  border-radius: 1.2rem;
  padding: 1.4rem 1.8rem;
  margin-left: auto;
  display: block;

  transition: color 260ms ease-in-out, background-color 260ms ease-in-out;
  &:hover {
    color: var(--color-shopping-add-item-background);
    background-color: transparent;
  }
`;

const Username = styled.span`
  color: var(--color-title);
  font-size: 1.4rem;
  font-weight: 500;
`;

const Avatar = styled.img`
  width: 4.8rem;
  height: 4.8rem;
  overflow: hidden;
  background-color: var(--color-white);
  border-radius: 50%;
  margin-bottom: 4.8rem;
  border: 0.2rem solid var(--color-accent);
`;
const NoAvatar = styled.p`
  color: var(--color-gray-200);
  font-size: 1.4rem;
  font-weight: 500;
`;

const UsernameIcon = styled(PiUserCircle)`
  height: 3rem;
  width: auto;
  color: var(--color-accent);
`;
const EmailIcon = styled(MdEmail)`
  height: 3rem;
  width: auto;
  color: var(--color-accent);
`;
const PassWordIcon = styled(MdLock)`
  height: 3rem;
  width: auto;
  color: var(--color-accent);
`;
const EditIcon = styled(MdEditSquare)`
  height: 1.2rem;
  width: auto;
  color: var(--color-gray-100);
  transform: translateY(-0.8rem);
`;
const IconContainer = styled.div``;

const Container = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-bottom: 2.4rem;
  align-items: center;
  padding-bottom: 1.2rem;
  border-bottom: 0.1rem solid var(--color-gray-200);
`;
const Text = styled.p`
  font-size: 1.6rem;
  color: var(--color-black);
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  margin-bottom: 2.8rem;
`;

const InputContainer = styled.div`
  position: relative;
`;

const SaveButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;

  font-size: 1rem;
  background-color: var(--color-accent);
  border: 0.1rem solid var(--color-accent);
  border-radius: 0.8rem;
  color: var(--color-white);
  padding: 0 0.8rem;
  font-weight: 500;
`;

const Input = styled.input`
  font-size: 1.4rem;
  font-weight: 500;
  width: auto;
  padding: 0.6rem 1.6rem;
  border: 0.1rem solid var(--color-gray-200);
  border-radius: 0.8rem;
  background: transparent;
`;

const UsernameInput = styled(Input)``;
const EmailInput = styled(Input)``;
const PasswordInput = styled(Input)``;

function Account() {
  const [isOpenEmail, setIsOpenEmail] = useState(false);
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [isOpenUsername, setIsOpenUsername] = useState(false);

  const { logout, error: logoutError } = useLogout();
  const { user, error: useError, isLoading: isLoadingUser } = useUser();
  const { updateUsername, error: updateUsernameError } = useUpdateUsername();
  const {
    profile,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useGetUserProfile({ userId: user.id });
  const { updateUser, error: updateUserError } = useUpdateUser();
  const [email, setEmail] = useState(user?.email);
  const [username, setUsername] = useState(profile?.at(0).user_name);
  const [password, setPassword] = useState('');

  function onHandleUsername(e) {
    setUsername(e.target.value);
  }
  function onHandleEmail(e) {
    setEmail(e.target.value);
  }
  function onHandlePassword(e) {
    setPassword(e.target.value);
  }

  function onSaveUsername() {
    updateUsername({ username: username });
  }
  function onSaveEmail() {
    if (!email) return;
    updateUser({ email: email });
  }
  function onSavePassword() {
    if (!password) return;
    updateUser({ password: password });
  }

  if (isLoadingUser && isLoadingProfile) return <Spinner />;

  if (useError) return <p>{useError.message}</p>;
  if (profileError) return <p>{profileError.message}</p>;
  if (logoutError) return <p>{logoutError.message}</p>;
  if (updateUserError) return <p>{updateUserError.message}</p>;

  return (
    <StyledAccount>
      <Title>Account details</Title>

      <Avatar
        src={
          profile?.at(0).avatar
            ? profile?.at(0).avatar
            : 'https://noghsukxfznxlmhenbko.supabase.co/storage/v1/object/public/defaults/user.png'
        }
      />

      <Container>
        <UsernameIcon />
        {!isOpenUsername && (
          <Text>
            {profile?.at(0).user_name
              ? profile?.at(0).user_name
              : 'add a username'}
          </Text>
        )}

        {isOpenUsername && (
          <InputContainer>
            <UsernameInput
              value={username}
              onChange={onHandleUsername}
              placeholder="username"
              type="text"
            />
            <SaveButton onClick={onSaveUsername}>Save</SaveButton>
          </InputContainer>
        )}
        <IconContainer onClick={() => setIsOpenUsername(!isOpenUsername)}>
          <EditIcon />
        </IconContainer>
      </Container>

      <Container>
        <EmailIcon />
        {!isOpenEmail && <Text>{user?.email} </Text>}
        {isOpenEmail && (
          <InputContainer>
            <EmailInput
              value={email}
              onChange={onHandleEmail}
              type="email"
              placeholder="new email"
            />
            <SaveButton onClick={onSaveEmail}>Save</SaveButton>
          </InputContainer>
        )}

        <IconContainer onClick={() => setIsOpenEmail(!isOpenEmail)}>
          <EditIcon />
        </IconContainer>
      </Container>

      <Container>
        <PassWordIcon />
        {!isOpenPassword && <Text>*********</Text>}

        {isOpenPassword && (
          <InputContainer>
            <PasswordInput
              value={password}
              onChange={onHandlePassword}
              type="password"
              placeholder="new password"
            />
            <SaveButton onClick={onSavePassword}>Save</SaveButton>
          </InputContainer>
        )}

        <IconContainer onClick={() => setIsOpenPassword(!isOpenPassword)}>
          <EditIcon />
        </IconContainer>
      </Container>

      {/* <>
        <EmailInput type="email" placeholder="new email" />
        <PasswordInput type="password" placeholder="new password" />
      </> */}

      {/* Username avatar email change email change password delete account */}
      <ButtonContainer>
        <Logout onClick={logout}>Logout</Logout>
      </ButtonContainer>
    </StyledAccount>
  );
}

export default Account;
