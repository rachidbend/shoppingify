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
import { useUpdateAvatar } from '../Hooks/useUpdateAvatar';
import { useGetAllAvatars } from '../Hooks/useGetAllAvatars';

const StyledAccount = styled.div`
  background-color: var(--color-background);
  height: 100%;
  padding: 0 8rem;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 1600px) {
    padding: 0 14rem;
  }

  @media screen and (max-width: 1024px) {
    padding: 0 4.8rem;
  }

  @media screen and (max-width: 780px) {
    padding: 0 2.4rem;
  }

  @media screen and (max-width: 480px) {
    padding: 0 1.25rem;
  }
`;

const Title = styled.h2`
  color: var(--color-title);
  font-size: 1.8rem;
  font-weight: 500;

  margin-top: 6.8rem;
  margin-bottom: 4.8rem;

  @media screen and (max-width: 1024px) {
    margin-top: 3.85rem;
    margin-bottom: 2rem;
  }

  @media screen and (max-width: 780px) {
    margin-top: 3.85rem;
    margin-bottom: 2rem;
  }

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
  cursor: pointer;

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
  cursor: pointer;

  position: absolute;
  top: 1rem;
  left: 0;
`;
const IconContainer = styled.div`
  position: relative;
  width: auto;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-bottom: 2.4rem;
  align-items: center;
  padding-bottom: 1.2rem;
  border-bottom: 0.1rem solid var(--color-gray-200);

  @media screen and (max-width: 780px) {
    width: 80%;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;
const Text = styled.p`
  font-size: 1.6rem;
  color: var(--color-black);
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  margin-bottom: 8rem;

  @media screen and (min-width: 1600px) {
    margin-bottom: 8rem;
  }

  @media screen and (max-width: 780px) {
    width: 80%;
    margin-bottom: 4.8rem;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    margin-bottom: 2.8rem;
  }
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
  outline: none;

  &:focus {
    border: 0.1rem solid var(--color-accent);
  }
`;

const AvatarChooseImage = styled.img`
  height: 2.4rem;
  width: 2.4rem;
`;

const UsernameInput = styled(Input)``;
const EmailInput = styled(Input)``;
const PasswordInput = styled(Input)``;

function Account() {
  const [isOpenEmail, setIsOpenEmail] = useState(false);
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [isOpenUsername, setIsOpenUsername] = useState(false);
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const [isOpenAvatarChoose, setIsOpenAvatarChoose] = useState(false);

  const { logout, error: logoutError } = useLogout();
  const { user, error: useError, isLoading: isLoadingUser } = useUser();
  const { updateUsername, error: updateUsernameError } = useUpdateUsername();
  const {
    profile,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useGetUserProfile({ userId: user.id });
  const { updateAvatar, error: avatarError } = useUpdateAvatar();
  const {
    avatars,
    isLoading: isLoadingAvatars,
    error: getAvatarError,
  } = useGetAllAvatars();

  const { updateUser, error: updateUserError } = useUpdateUser();
  const [email, setEmail] = useState(user?.email);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  function onHandleUsername(e) {
    setUsername(e.target.value);
  }
  function onHandleEmail(e) {
    setEmail(e.target.value);
  }
  function onHandlePassword(e) {
    setPassword(e.target.value);
  }
  function handleAvatarUrl(e) {
    setAvatarUrl(e.target.value);
  }
  function handleChooseAvatar(url) {
    updateAvatar({ url: url });
    setIsOpenAvatar(false);
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
  function onSaveAvatarUrl() {
    updateAvatar({ url: avatarUrl });
    setIsOpenAvatar(false);
  }

  if (isLoadingUser || isLoadingProfile || isLoadingAvatars) return <Spinner />;

  if (useError) return <p>{useError.message}</p>;
  if (profileError) return <p>{profileError.message}</p>;
  if (logoutError) return <p>{logoutError.message}</p>;
  if (updateUserError) return <p>{updateUserError.message}</p>;
  if (getAvatarError) return <p>{getAvatarError.message}</p>;

  return (
    <StyledAccount>
      <Title>Account details</Title>
      <Container>
        <Avatar
          src={
            profile?.at(0)?.avatar
              ? profile?.at(0)?.avatar
              : 'https://noghsukxfznxlmhenbko.supabase.co/storage/v1/object/public/defaults/user.png'
          }
        />
        {isOpenAvatar && (
          <>
            <InputContainer>
              <Input
                placeholder="Image URL"
                type="text"
                value={avatarUrl}
                onChange={handleAvatarUrl}
              />
              <SaveButton
                onClick={() => {
                  onSaveAvatarUrl();
                }}
              >
                Save
              </SaveButton>
            </InputContainer>
            <p>Choose an avatart</p>
            <div>
              {avatars.map(avatar => (
                <AvatarChooseImage
                  onClick={() => handleChooseAvatar(avatar.url)}
                  key={`avatar-${avatar.id}`}
                  src={avatar.url}
                />
              ))}
            </div>
          </>
        )}
        <IconContainer onClick={() => setIsOpenAvatar(!isOpenAvatar)}>
          <EditIcon />
        </IconContainer>
      </Container>

      <Container>
        <UsernameIcon />
        {!isOpenUsername && (
          <Text>
            {profile?.at(0)?.user_name
              ? profile?.at(0)?.user_name
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
            <SaveButton
              onClick={() => {
                onSaveUsername();
                setIsOpenUsername(false);
              }}
            >
              Save
            </SaveButton>
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
            <SaveButton
              onClick={() => {
                onSaveEmail();
                isOpenEmail(false);
              }}
            >
              Save
            </SaveButton>
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
            <SaveButton
              onClick={() => {
                onSavePassword();
                isOpenPassword(false);
              }}
            >
              Save
            </SaveButton>
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
