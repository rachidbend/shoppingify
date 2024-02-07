import styled from 'styled-components';

// Styled component for the container of items within a category
const StyledItemsCategory = styled.div`
  margin-bottom: ${props =>
    props.marginbottom ? props.marginbottom : '4.6rem'};
  @media screen and (max-width: 480px) {
    margin-bottom: 2.71rem;
  }
`;

// Styled component for the title of a category
const Title = styled.h2`
  color: var(--color-black);
  margin-bottom: 1.8rem;
  font-size: 1.8rem;
  font-weight: 500;
`;

// Styled component for the container of items within a category
const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1.96rem;
  flex-grow: 0;
  flex-shrink: 0;
  @media screen and (max-width: 480px) {
    gap: 0.86rem;
    row-gap: 2.4rem;
  }
`;

// Component representing a category of items.
function ItemsCategory({ children, marginbottom }) {
  return (
    <StyledItemsCategory marginbottom={marginbottom}>
      {children}
    </StyledItemsCategory>
  );
}

// Assigning styled components as properties of the ItemsCategory component for reusability and ease of use.
ItemsCategory.Title = Title;
ItemsCategory.Container = Container;

export default ItemsCategory;
