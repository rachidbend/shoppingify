import { motion } from 'framer-motion';
import styled from 'styled-components';
import { childrenVariants, routeVariants } from '../Variables/variables';
import { useGetAllItems } from '../Hooks/useGetAllItems';

const StyledItems = styled(motion.div)`
  /* background-color: yellow; */
  padding: 0 8rem;
`;

const ChildrenContainer = styled(motion.div)``;

const Title = styled.h1`
  color: var(--color-title);

  font-size: 2.6rem;

  font-weight: 500;
`;

const TitleAccent = styled.span`
  color: var(--color-accent);

  font-weight: 700;
`;

function Items() {
  const { items, isLoading, error } = useGetAllItems();

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;
  // console.log(items);
  return (
    <StyledItems variants={routeVariants} initial="initial" animate="final">
      <ChildrenContainer
        variants={childrenVariants}
        initial="initial"
        animate="final"
      >
        <Title>
          <TitleAccent>Shoppingify </TitleAccent>
          allows you take your shopping list wherever you go
        </Title>
        {items.map(item => (
          <p key={item.id}>{item.name}</p>
        ))}
      </ChildrenContainer>
    </StyledItems>
  );
}

export default Items;
