import { motion, stagger, useAnimate } from 'framer-motion';
import styled from 'styled-components';
import { useGetHistory } from '../Hooks/useGetHistory';
import Spinner from '../UI/Spinner';
import { monthsNames } from '../helpers/helperVariables';
import List from '../UI/List';
import toast from 'react-hot-toast';
import {
  mainPagesChildrenVariants,
  mainPagesVariants,
} from '../transitions/variants';
import { useEffect } from 'react';

const StyledHistory = styled(motion.div)`
  padding: 0 8rem;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  @media screen and (min-width: 1600px) {
    padding: 0 14rem;
  }

  @media screen and (max-width: 1024px) {
    padding: 0 2.4rem;
  }

  @media screen and (max-width: 780px) {
    padding: 0 2.4rem;
  }

  @media screen and (max-width: 480px) {
    padding: 0 1.24rem;
  }
`;
const ChildrenContainer = styled(motion.div)``;

const Title = styled.h2`
  color: var(--color-title);
  font-size: 2.6rem;
  font-weight: 700;
  margin-top: 3.75rem;
  margin-bottom: 4.12rem;
`;

const GroupContainer = styled.div`
  margin-bottom: 5.39rem;
`;
const ListContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-grow: 0;

  gap: 2.8rem;

  @media screen and (max-width: 480px) {
    gap: 2rem;
  }
`;
const GroupTitle = styled.p`
  color: var(--color-black);
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1.74rem;
`;

const parentContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.6,
      delay: 0.3,
      duration: 0.4,
      staggerChildren: 0.3,
    },
  },
};

const childrenVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeIn' } },
};

const groupChildrenVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 1,
    },
  },
};

const groupParentConainer = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeIn' } },
};

// Component for displaying shopping history.
function History() {
  // Fetch historical shopping lists
  const { history, isLoading, error } = useGetHistory();

  // //////////////////////////////////////////////////////////
  // const staggerListItems = stagger(0.4, { startDelay: 0.2 });
  // const [scope, animate] = useAnimate();
  // useEffect(function () {
  //   animate('li', { opacity: 1 }, { duration: 1, delay: staggerListItems });
  // });
  // //////////////////////////////////////////////////////////

  // Show loading spinner while fetching data
  if (isLoading) return <Spinner />;

  // Show error toast if there's an error fetching history
  if (error) toast.error(error.message);

  // Group shopping lists by month and year
  const filteredLists = history.reduce((accumulator, list) => {
    // Grouped by the month and year where they were created
    const { created_at } = list;
    const date = new Date(created_at);
    const month = date.getMonth();
    const year = date.getFullYear();
    const fullDate = `${monthsNames.at(month)} ${year}`;
    // Check if the category is already a key in the accumulator
    if (!accumulator[fullDate]) {
      accumulator[fullDate] = [];
    }
    // Push the current object to the array corresponding to the category
    accumulator[fullDate].push(list);

    return accumulator;
  }, {});

  return (
    <StyledHistory
      initial="hidden"
      animate="visible"
      variants={mainPagesVariants}
      transition={mainPagesVariants.transition}
    >
      <ChildrenContainer
        initial="hidden"
        animate="visible"
        transition={mainPagesChildrenVariants.transition}
        variants={mainPagesChildrenVariants}
      >
        <Title>Shopping history</Title>
        {/* Render each group of lists */}
        <motion.div
          variants={groupChildrenVariants}
          initial="hidden"
          animate="show"
        >
          {Object.keys(filteredLists).map(key => (
            <motion.div
              variants={groupParentConainer}
              key={`${key}-container-div`}
            >
              <GroupContainer key={key}>
                <GroupTitle>{key} </GroupTitle>
                {/* Render each list within the group */}

                <ListContainer
                  variants={parentContainerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {filteredLists[key]?.map(list => (
                    <motion.div
                      key={`${key}-container`}
                      variants={childrenVariants}
                    >
                      <List list={list} key={list.id} />
                    </motion.div>
                  ))}
                </ListContainer>
              </GroupContainer>
            </motion.div>
          ))}
        </motion.div>
      </ChildrenContainer>
    </StyledHistory>
  );
}

export default History;
