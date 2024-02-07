import styled from 'styled-components';

const StyledPageNotFound = styled.div``;

// PageNotFound component renders a message indicating that the requested page could not be found.
function PageNotFound() {
  return (
    <StyledPageNotFound>
      <h1>Sorry, we could not find this page</h1>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
