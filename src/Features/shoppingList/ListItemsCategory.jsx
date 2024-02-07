/* eslint-disable react/prop-types */
import styled from 'styled-components';

const StyledListItemsCategory = styled.div`
  margin-bottom: 5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Title = styled.h3`
  color: var(--color-grey-400);
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 1.68rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 1rem;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  @media screen and (max-width: 480px) {
    gap: 0.86rem;
  }
`;

function ListItemsCategory({ children }) {
  return <StyledListItemsCategory>{children}</StyledListItemsCategory>;
}

ListItemsCategory.Title = Title;
ListItemsCategory.Container = Container;

export default ListItemsCategory;
