import { motion } from 'framer-motion';
import styled from 'styled-components';
import { childrenVariants, routeVariants } from '../Variables/variables';

const StyledHistory = styled(motion.div)`
  /* background-color: blue; */
`;
const ChildrenContainer = styled(motion.div)``;

function History() {
  return (
    <StyledHistory variants={routeVariants} initial="initial" animate="final">
      <ChildrenContainer
        variants={childrenVariants}
        initial="initial"
        animate="final"
      >
        History
      </ChildrenContainer>
    </StyledHistory>
  );
}

export default History;
