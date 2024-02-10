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
import { motion } from 'framer-motion';
import {
  mainPagesChildrenVariants,
  mainPagesVariants,
} from '../transitions/variants';
import AvatarUpdateModal from '../UI/AvatarUpdateModal';
import ModalWrapper from '../Features/shoppingList/ModalWrapper';

const StyledAccount = styled(motion.div)`
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

const Avatar = styled.img`
  width: 11rem;
  height: 11rem;
  /* box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1); */
  overflow: hidden;
  background-color: var(--color-white);
  border-radius: 15rem;

  object-fit: cover;

  @media screen and (max-width: 1024px) {
    width: 11rem;
    height: 11rem;
  }

  @media screen and (max-width: 780px) {
    width: 9.2rem;
    height: 9.2rem;
  }

  @media screen and (max-width: 480px) {
    width: 6.8rem;
    height: 6.8rem;
  }
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
  color: var(--color-grey-100);
  top: 1rem;
  left: 0;
`;
const IconContainer = styled(motion.div)`
  position: relative;
  width: auto;
  height: 100%;
  padding: 0.4rem;
  cursor: pointer;
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-grey-100);
`;

const Container = styled(motion.div)`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  flex-wrap: wrap;
  border: 0.1rem solid var(--color-grey-200);
  padding: 2rem 2.8rem;
  border-radius: 1.4rem;
  margin-bottom: 2.8rem;

  position: relative;

  background-color: var(--color-background);

  @media screen and (max-width: 780px) {
    padding: 1rem 1.4rem;
  }

  @media screen and (max-width: 480px) {
    padding: 1rem 1.4rem;
  }
`;
const Text = styled.p`
  font-size: 1.6rem;
  color: var(--color-black);
  font-weight: 500;
  /* width: 100%; */

  @media screen and (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  margin-top: 8rem;

  @media screen and (min-width: 1600px) {
    margin-top: 8rem;
  }

  @media screen and (max-width: 780px) {
    width: 80%;
    margin-top: 4.8rem;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    margin-top: 2.8rem;
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

  font-size: 1.2rem;
  background-color: var(--color-accent);
  border: 0.1rem solid var(--color-accent);
  border-radius: 0.8rem;
  color: var(--color-white);
  padding: 0 1.4rem;
  font-weight: 500;
`;

const Input = styled(motion.input)`
  font-size: 1.6rem;
  font-weight: 500;
  width: 100%;

  padding: 1rem 1.6rem;
  border: 0.1rem solid var(--color-grey-200);
  border-radius: 0.8rem;
  background: transparent;
  outline: none;

  &:focus {
    border: 0.1rem solid var(--color-accent);
  }
`;

const ChildrenContainer = styled(motion.div)`
  margin-top: 12rem;
  background-color: var(--color-white);
  padding: 4.8rem;
  border-radius: 2.4rem;
  box-shadow: var(--shadow-item);
  max-width: 100%;
  @media screen and (max-width: 780px) {
    padding: 2.4rem;
    padding-top: 3.2rem;
  }

  @media screen and (max-width: 480px) {
    padding: 1.2rem;
    padding-top: 2.4rem;
  }
`;

const AvatarContainer = styled.div`
  text-align: center;
  margin-bottom: 4.8rem;
  position: relative;
  display: inline-block;

  &:hover div {
    opacity: 1;
  }
`;

const AvatarEditContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 0;
  width: 11rem;
  height: 11rem;
  border-radius: 50%;
  background-color: rgba(5, 5, 5, 0.5);
  overflow: hidden;

  transform: translate(-50%, -50%);
  transition: opacity var(--transition-simple);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 1.4rem;
    font-weight: 600;
    padding: 0.4rem 0.8rem;
    color: var(--color-white);
    display: inline-block;
  }

  @media screen and (max-width: 1024px) {
    width: 11rem;
    height: 11rem;
  }
  @media screen and (max-width: 780px) {
    width: 9.2rem;
    height: 9.2rem;
  }
  @media screen and (max-width: 480px) {
    width: 6.8rem;
    height: 6.8rem;
  }
`;

const AvatarContentContainer = styled.div`
  text-align: center;
`;

const UsernameInput = styled(Input)``;
const EmailInput = styled(Input)``;
const PasswordInput = styled(Input)``;

function Account() {
  const [isOpenEmail, setIsOpenEmail] = useState(false);
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [isOpenUsername, setIsOpenUsername] = useState(false);
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);

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
  const [username, setUsername] = useState('');
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

  if (isLoadingUser || isLoadingProfile) return <Spinner />;

  if (useError) return <p>{useError.message}</p>;
  if (profileError) return <p>{profileError.message}</p>;
  if (logoutError) return <p>{logoutError.message}</p>;
  if (updateUserError) return <p>{updateUserError.message}</p>;

  return (
    <StyledAccount
      initial="hidden"
      animate="visible"
      variants={mainPagesVariants}
      transition={mainPagesVariants.transition}
    >
      <ChildrenContainer
        initial="hidden"
        animate="visible"
        transition={mainPagesChildrenVariants.transition}
        variants={mainPagesChildrenVariants}
      >
        <AvatarContentContainer>
          <AvatarContainer>
            <Avatar
              src={
                profile?.at(0)?.avatar
                  ? profile?.at(0)?.avatar
                  : 'https://noghsukxfznxlmhenbko.supabase.co/storage/v1/object/public/defaults/user.png'
              }
            />

            <AvatarEditContainer onClick={() => setIsOpenAvatar(!isOpenAvatar)}>
              <p>Edit</p>
            </AvatarEditContainer>
          </AvatarContainer>
        </AvatarContentContainer>

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

        {/* Username avatar email change email change password delete account */}
        <ButtonContainer>
          <Logout onClick={logout}>Logout</Logout>
        </ButtonContainer>
      </ChildrenContainer>
      <ModalWrapper isShowing={isOpenAvatar}>
        <AvatarUpdateModal isOpen={isOpenAvatar} handleOpen={setIsOpenAvatar} />
      </ModalWrapper>
    </StyledAccount>
  );
}

export default Account;
