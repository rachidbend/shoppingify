import styled from 'styled-components';

const StyledEmptyContainer = styled.div`
  display: none;
`;

//  EmptyContainer component renders an empty container with styles defined in StyledEmptyContainer.
//  This component serves as a placeholder or fallback when no content needs to be rendered.
//  It's meant to be a placeholder for the item details component, since it is rendered only when the main Items page is visible, and only on the side page
function EmptyContainer() {
  return <StyledEmptyContainer></StyledEmptyContainer>;
}

export default EmptyContainer;
