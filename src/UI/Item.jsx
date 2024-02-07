/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';

const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: flex-start;
  gap: 1.2rem;

  width: 18.2rem;
  border-radius: 1.2rem;
  background-color: var(--color-white);
  box-shadow: var(--shadow-item);
  padding: 1.3rem 1.2rem;

  transform: scale(100%);

  &:hover {
    transform: scale(102%);
    box-shadow: var(--shadow-item-hover);
  }

  @media screen and (max-width: 1024px) {
    width: 16rem;
  }

  @media screen and (max-width: 480px) {
    width: 14rem;
  }
`;
const Name = styled.p`
  color: var(--color-black);
  font-size: 1.6rem;
  font-weight: 500;
`;
const Icon = styled(MdAdd)`
  width: 2.4rem;
  height: 2.4rem;
  color: var(--color-grey-100);
  cursor: pointer;

  &:hover {
    color: var(--color-accent);
  }
`;

const StyledLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
`;

// Component representing an individual item in the items page
function Item({ itemDetails, onAddItem }) {
  // available variables { id, created_at, name, note, image, category }
  // Destructure needed item details
  const { id, name } = itemDetails;

  return (
    <StyledItem>
      {/* Link to item details */}
      <StyledLink to={`/items/${id}`}>
        {/* Item name */}
        <Name>{name}</Name>
      </StyledLink>
      {/* Icon for adding the item */}
      <div onClick={() => onAddItem(itemDetails)}>
        <Icon />
      </div>
    </StyledItem>
  );
}

export default Item;
