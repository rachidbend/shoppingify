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

const StyledAccount = styled.div`
  background-color: var(--color-background);

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
  height: 2.4rem;
  width: auto;
  color: var(--color-accent);
`;
const EmailIcon = styled(MdEmail)`
  height: 2.4rem;
  width: auto;
  color: var(--color-accent);
`;
const PassWordIcon = styled(MdLock)`
  height: 2.4rem;
  width: auto;
  color: var(--color-accent);
`;
const EditIcon = styled(MdEditSquare)`
  height: 1.2rem;
  width: auto;
  color: var(--color-gray-100);
`;

const Container = styled.div`
  display: flex;
  gap: 1.8rem;
  margin-bottom: 2.4rem;
`;
const Text = styled.p`
  font-size: 1.6rem;
  color: var(--color-black);
  font-weight: 500;
`;

const EmailInput = styled.input``;
const PasswordInput = styled.input``;

function Account() {
  const [isOpen, setIsOpen] = useState('');

  const { logout, error: logoutError } = useLogout();
  const { user, error: useError, isLoading: isLoadingUser } = useUser();
  const {
    profile,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useGetUserProfile({ userId: user.id });

  if (isLoadingUser && isLoadingProfile) return <Spinner />;
  if (useError) return <p>{useError.message}</p>;
  if (profileError) return <p>{profileError.message}</p>;
  if (logoutError) return <p>{logoutError.message}</p>;

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
        <Text>
          {profile?.at(0).user_name
            ? profile?.at(0).user_name
            : 'add a username'}
        </Text>
        <EditIcon />
      </Container>
      <Container>
        <EmailIcon />
        <Text>{user?.email} </Text>
        <EditIcon />
      </Container>
      <Container>
        <PassWordIcon />
        <Text>*********</Text>
        <EditIcon />
      </Container>

      {isOpen && (
        <>
          <EmailInput type="email" placeholder="new email" />
          <PasswordInput type="password" placeholder="new password" />
        </>
      )}

      {/* Username avatar email change email change password delete account */}
      <Logout onClick={logout}>Logout</Logout>
    </StyledAccount>
  );
}

export default Account;
