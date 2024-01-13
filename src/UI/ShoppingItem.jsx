import styled from 'styled-components';

// item
const StyledShoppingItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  flex-grow: 0;
  flex-shrink: 0;
  margin-bottom: 1rem;
`;
// item name
const Name = styled.p`
  color: var(--color-black);
  font-size: 1.8rem;
  font-weight: 500;
`;
// item qantity
const Quantity = styled.button`
  color: var(--color-accent);
  font-size: 1.2rem;
  font-weight: 700;

  background: none;
  border-radius: 2.4rem;
  border: 0.2rem solid var(--color-accent);
  width: 6.8rem;
  height: 3.2rem;
  text-align: center;
`;
const QuantityPcs = styled.span`
  font-weight: 500;
`;

function ShoppingItem({ item }) {
  return (
    <StyledShoppingItem>
      <Name>{item.name} </Name>
      <Quantity>
        {item.quantity}
        <QuantityPcs> pcs</QuantityPcs>
      </Quantity>
    </StyledShoppingItem>
  );
}

export default ShoppingItem;
