import styled from 'styled-components';

const StyledItemsCategory = styled.div`
  margin-bottom: ${props =>
    props.marginbottom ? props.marginbottom : '4.6rem'};
  @media screen and (max-width: 480px) {
    margin-bottom: 2.71rem;
  }
`;

const Title = styled.h2`
  color: var(--color-black);
  margin-bottom: 1.8rem;
  font-size: 1.8rem;
  font-weight: 500;
`;

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

function ItemsCategory({ children, marginbottom }) {
  return (
    <StyledItemsCategory marginbottom={marginbottom}>
      {children}
    </StyledItemsCategory>
  );
}

ItemsCategory.Title = Title;
ItemsCategory.Container = Container;

export default ItemsCategory;
