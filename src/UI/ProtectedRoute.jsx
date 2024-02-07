import styled from 'styled-components';
import { useUser } from '../Hooks/useUser';
import Spinner from './Spinner';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

// full page background for the spinner
const FullPage = styled.div`
  height: 100vh;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-background);
`;

// ProtectedRoute component ensures that only authenticated users can access certain routes.
export default function ProtectedRoute({ children }) {
  // Initialize useNavigate hook
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading: isLoadingUser, isAuthenticated, fetchStatus } = useUser();

  // 2. if there is NO authenticated user, redirect to '/login'
  // Redirect to '/login' if there is NO authenticated user and loading has finished
  useEffect(
    function () {
      if (!isAuthenticated && !isLoadingUser && fetchStatus !== 'fetching')
        navigate('/login');
    },
    [isAuthenticated, isLoadingUser, navigate, fetchStatus]
  );

  // 3. while loading, show spinner

  if (isLoadingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // Show error message if there is no authenticated user
  if (!isAuthenticated)
    toast.error('You must be authenticated first!', { duration: 2000 });
  // 4. if there is an authenticated user, render the app
  if (isAuthenticated) return children;
}
