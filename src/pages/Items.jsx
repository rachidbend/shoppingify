import { motion } from 'framer-motion';
import styled from 'styled-components';
import { childrenVariants, routeVariants } from '../Variables/variables';

const StyledItems = styled(motion.div)`
  /* background-color: yellow; */
`;

const ChildrenContainer = styled(motion.div)``;

function Items() {
  return (
    <StyledItems variants={routeVariants} initial="initial" animate="final">
      <ChildrenContainer
        variants={childrenVariants}
        initial="initial"
        animate="final"
      >
        Items
      </ChildrenContainer>
    </StyledItems>
  );
}

export default Items;
