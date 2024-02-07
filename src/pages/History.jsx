import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useGetHistory } from '../Hooks/useGetHistory';
import Spinner from '../UI/Spinner';

import { Outlet } from 'react-router-dom';
import { monthsNames } from '../helpers/helperVariables';
import List from '../UI/List';
import toast from 'react-hot-toast';

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
const ListContainer = styled.div`
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

// Component for displaying shopping history.
function History() {
  // Fetch historical shopping lists
  const { history, isLoading, error } = useGetHistory();

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
    <StyledHistory>
      <ChildrenContainer>
        <Title>Shopping history</Title>
        {/* Render each group of lists */}
        {Object.keys(filteredLists).map(key => (
          <GroupContainer key={key}>
            <GroupTitle>{key} </GroupTitle>
            {/* Render each list within the group */}
            <ListContainer>
              {filteredLists[key]?.map(list => (
                <List list={list} key={list.id} />
              ))}
            </ListContainer>
          </GroupContainer>
        ))}
      </ChildrenContainer>
    </StyledHistory>
  );
}

export default History;
