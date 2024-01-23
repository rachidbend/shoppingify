import { motion } from 'framer-motion';
import styled from 'styled-components';
import { childrenVariants, routeVariants } from '../Variables/variables';
import { useGetHistory } from '../Hooks/useGetHistory';
import Spinner from '../UI/Spinner';
import { MdEventNote } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';

const StyledHistory = styled(motion.div)`
  /* background-color: blue; */
  padding: 0 8rem;
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
`;
const GroupTitle = styled.p`
  color: var(--color-black);
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1.74rem;
`;
const List = styled.div`
  background-color: var(--color-white);
  border-radius: 1.2rem;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.05);
  padding: 2.2rem 1.66rem 2.15rem 2.07rem;

  display: flex;
  flex-wrap: nowrap;
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
`;
const ListName = styled.p`
  font-size: 1.6rem;
  color: var(--color-black);
  font-weight: 500;
`;
const CalendarIcon = styled(MdEventNote)`
  width: 2.4rem;
  height: 2.4rem;
  color: var(--color-gray-500);
  margin-right: 1rem;
`;

const DateOfCompletion = styled.p``;
const ListTag = styled.p`
  color: ${props =>
    props.iscompleted === 'true' ? 'var(--color-blue)' : 'var(--color-red)'};
  font-size: 1.2rem;
  font-weight: 500;
  border: 1px solid
    ${props =>
      props.iscompleted === 'true' ? 'var(--color-blue)' : 'var(--color-red)'};
  border-radius: 0.8rem;
  padding: 0.43rem 0.72rem 0.47rem 0.78rem;

  margin-left: 2.63rem;
  margin-right: 3.27rem;
`;
const ArrowIcon = styled(MdArrowForwardIos)`
  height: 1.49rem;
  width: auto;
  color: var(--color-accent);
`;

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-grow: 0;
  flex-shrink: 0;
  align-items: center;
`;

const monthsNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function History() {
  const { history, isLoading, error } = useGetHistory();

  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message}</p>;
  /*
id
  completed_at
  created_at
  is_canceled
  is_completed
  name
  shopping_list
   */

  // re-used the logic from the items category orgoniser function
  const filteredLists = history.reduce((accumulator, list) => {
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
  // console.log(filteredLists);

  return (
    <StyledHistory variants={routeVariants} initial="initial" animate="final">
      <ChildrenContainer
        variants={childrenVariants}
        initial="initial"
        animate="final"
      >
        <Title>Shopping history</Title>

        {Object.keys(filteredLists).map(key => (
          <GroupContainer key={key}>
            <GroupTitle>{key} </GroupTitle>
            <ListContainer>
              {filteredLists[key].map(list => (
                <List key={list.id}>
                  <ListName>{list.name}</ListName>
                  <Container>
                    <CalendarIcon />
                    <DateOfCompletion>
                      {new Date(list.completed_at).toDateString()}
                    </DateOfCompletion>
                    <ListTag iscompleted={list.is_completed ? 'true' : 'false'}>
                      {list.is_completed ? 'completed' : 'canceled'}
                    </ListTag>
                    <ArrowIcon />
                  </Container>
                </List>
              ))}
            </ListContainer>
          </GroupContainer>
        ))}
      </ChildrenContainer>
    </StyledHistory>
  );
}

export default History;
