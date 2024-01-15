import { motion } from 'framer-motion';
import styled from 'styled-components';

// item
const StyledShoppingItem = styled(motion.div)`
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
    <StyledShoppingItem
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.2,
      }}
      key={`shopping itel ${item.id}`}
    >
      <Name>{item.name} </Name>
      <Quantity>
        {item.quantity}
        <QuantityPcs> pcs</QuantityPcs>
      </Quantity>
    </StyledShoppingItem>
  );
}

export default ShoppingItem;
