import { motion } from 'framer-motion';
import styled from 'styled-components';
import { childrenVariants, routeVariants } from '../Variables/variables';
import { useGetAllItems } from '../Hooks/useGetAllItems';

const StyledItems = styled(motion.div)`
  /* background-color: yellow; */
`;

const ChildrenContainer = styled(motion.div)``;

function Items() {
  const { items, isLoading, error } = useGetAllItems();

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <StyledItems variants={routeVariants} initial="initial" animate="final">
      <ChildrenContainer
        variants={childrenVariants}
        initial="initial"
        animate="final"
      >
        Items
        {items.map(item => (
          <p key={item.id}>{item.name}</p>
        ))}
      </ChildrenContainer>
    </StyledItems>
  );
}

export default Items;
