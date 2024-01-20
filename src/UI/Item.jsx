/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';

const StyledItem = styled.div`
  width: 18.2rem;
  border-radius: 1.2rem;
  background-color: var(--color-white);
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.05);
  padding: 1.3rem 1.2rem;

  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: flex-start;
  flex-grow: 0;
  flex-shrink: 0;

  transform: scale(100%);

  transition: 260ms ease-in-out;

  &:hover {
    transform: scale(103%);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.1);
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
  color: var(--color-gray-100);
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
`;

function Item({ itemDetails, onAddItem }) {
  const { id, created_at, name, note, image, category } = itemDetails;

  return (
    <StyledItem>
      <StyledLink to={`/items/${id}`}>
        <Name>{name}</Name>
      </StyledLink>
      <div onClick={() => onAddItem(itemDetails)}>
        <Icon />
      </div>
    </StyledItem>
  );
}

export default Item;
