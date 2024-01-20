import styled from 'styled-components';

const StyledEmptyContainer = styled.div`
  display: none;
`;

function EmptyContainer() {
  return <StyledEmptyContainer></StyledEmptyContainer>;
}

export default EmptyContainer;
