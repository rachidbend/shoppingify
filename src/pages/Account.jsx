import styled from 'styled-components';
import { useLogout } from '../Hooks/useLogout';
import { useUser } from '../Hooks/useUser';
import Spinner from '../UI/Spinner';
import { useGetUserProfile } from '../Hooks/useGetUserProfile';

const StyledAccount = styled.div``;
const Logout = styled.button``;

const Username = styled.p``;

const Avatar = styled.img``;

function Account() {
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
  console.log(user);
  console.log(profile);
  return (
    <StyledAccount>
      <Username>
        username :{' '}
        {profile?.at(0).user_name
          ? profile?.at(0).user_name
          : 'you have not added a username'}
      </Username>
      {!profile?.at(0).avatar && <p>there is no avatar image</p>}
      {profile?.at(0).avatar && <Avatar src={profile.at(0).avatar} />}

      <p>email : {user.email} </p>

      {/* Username avatar email change email change password delete account */}
      <Logout onClick={logout}>Logout</Logout>
    </StyledAccount>
  );
}

export default Account;
