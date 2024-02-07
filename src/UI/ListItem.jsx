/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledItem = styled.div`
  width: 18.2rem;
  border-radius: 1.2rem;
  background-color: var(--color-white);
  box-shadow: var(--shadow-item);
  padding: 1.3rem 1.2rem;
  padding-right: 1.8rem;

  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: flex-start;
  flex-grow: 0;
  flex-shrink: 0;
  gap: 2rem;
`;
const Name = styled.p`
  color: var(--color-black);
  font-size: 1.6rem;
  font-weight: 500;
`;

const StyledLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
`;

const Quantity = styled.p`
  color: var(--color-accent);
  font-size: 1.2rem;
  font-weight: 700;
  padding-top: 0.35rem;
`;
const QuantityText = styled.span`
  font-weight: 500;
`;

// ListItem component renders details of an individual item within a list.
// It displays the item name and quantity.
function ListItem({ itemDetails }) {
  // available variables { id, created_at, name, note, image, category, quantity }
  // Destructure itemDetails object to extract relevant properties
  const { id, name, quantity } = itemDetails;
  return (
    <StyledItem>
      {/* Link to navigate to the item details page */}
      <StyledLink to={`/items/${id}`}>
        {/* Display the name of the item */}
        <Name>{name}</Name>
      </StyledLink>
      {/* Display the quantity of the item */}
      <Quantity>
        {quantity} <QuantityText>pcs</QuantityText>
      </Quantity>
    </StyledItem>
  );
}

export default ListItem;
