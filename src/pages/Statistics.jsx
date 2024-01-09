import { motion } from 'framer-motion';
import styled from 'styled-components';
import { childrenVariants, routeVariants } from '../Variables/variables';

const StyledStatistics = styled(motion.div)`
  /* background-color: green; */
`;
const ChildrenContainer = styled(motion.div)``;

function Statistics() {
  return (
    <StyledStatistics
      variants={routeVariants}
      initial="initial"
      animate="final"
    >
      <ChildrenContainer
        variants={childrenVariants}
        initial="initial"
        animate="final"
      >
        Statistics
      </ChildrenContainer>
    </StyledStatistics>
  );
}

export default Statistics;
