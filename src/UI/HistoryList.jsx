import { useParams } from 'react-router';
import styled from 'styled-components';
import { useGetHistoryList } from '../Hooks/useGetHistoryList';
import Spinner from './Spinner';
import BackButton from './BackButton';
import { MdEventNote } from 'react-icons/md';
import ListItem from './ListItem';

const StyledHistoryList = styled.div`
  padding: 0 8.05rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

const Name = styled.h2`
  color: var(--color-title);
  font-size: 2.6rem;
  font-weight: 700;
  margin-bottom: 1.62rem;
`;
const DateOfCompletion = styled.p`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
const CalendarIcon = styled(MdEventNote)`
  width: 2.4rem;
  height: 2.4rem;
  color: var(--color-gray-500);
  margin-right: 1rem;
`;

const Container = styled.div`
  margin-top: 5rem;
`;

const CategoryContainer = styled.div`
  margin-bottom: 6.47rem;
`;

const CategoryTitle = styled.h2`
  color: var(--color-black);
  margin-bottom: 1.8rem;
  font-size: 1.8rem;
  font-weight: 500;
`;
const CategoryItemsContianer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1.96rem;
  flex-grow: 0;
  flex-shrink: 0;
`;

const ListDate = styled.span`
  color: var(--color-gray-300);
  font-size: 1.2rem;
  font-weight: 500;
`;

/*
id
created_at
completed_at
name
shopping_list [{…}, {…}, {…}]
is_canceled
is_completed
*/

const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

function HistoryList() {
  const { listId } = useParams();
  const { list, isLoading, error } = useGetHistoryList(listId);

  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message} </p>;
  console.log(list);
  const availableCategories = list
    .at(0)
    .shopping_list.reduce((accumulator, currentObject) => {
      const { category } = currentObject;

      // Check if the category is already a key in the accumulator
      if (!accumulator[category]) {
        accumulator[category] = [];
      }

      // Push the current object to the array corresponding to the category
      accumulator[category].push(currentObject);

      return accumulator;
    }, {});

  const listDate = new Date(list.at(0).completed_at);
  const listFullDate = `${
    daysOfTheWeek[listDate.getDay()]
  } ${listDate.getDate()}.${
    listDate.getMonth() + 1
  }.${listDate.getFullYear()} `;

  return (
    <StyledHistoryList>
      <BackButton marginTop="3.71rem" marginBottom="3.2rem" />
      <Name>{list.at(0).name}</Name>
      <DateOfCompletion>
        <CalendarIcon />
        <ListDate>{listFullDate}</ListDate>
      </DateOfCompletion>
      <Container>
        {Object.keys(availableCategories)?.map(key => (
          <CategoryContainer key={key}>
            <CategoryTitle>{key}</CategoryTitle>
            <CategoryItemsContianer>
              {availableCategories[key].map(item => {
                return <ListItem itemDetails={item} key={item.id} />;
              })}
            </CategoryItemsContianer>
          </CategoryContainer>
        ))}
      </Container>
    </StyledHistoryList>
  );
}

export default HistoryList;
