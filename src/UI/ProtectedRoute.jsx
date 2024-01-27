import styled from 'styled-components';
import { useUser } from '../Hooks/useUser';
import Spinner from './Spinner';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const FullPage = styled.div`
  height: 100vh;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-background);
`;

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. Load the authenticated user
  const { isLoading, isAuthenticated, fetchStatus } = useUser();

  // 2. if there is NO authenticated user, redirect to '/login'
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading && fetchStatus !== 'fetching')
        navigate('/login');
    },
    [isAuthenticated, isLoading, navigate, fetchStatus]
  );

  // 3. while loading, show spinner

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. if there is an authenticated user, render the app

  if (isAuthenticated) return children;
}
