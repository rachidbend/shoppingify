import { useParams } from 'react-router';
import styled from 'styled-components';
import { useGetHistoryList } from '../Hooks/useGetHistoryList';
import Spinner from './Spinner';
import BackButton from './BackButton';
import { MdEventNote } from 'react-icons/md';
import ListItem from './ListItem';
import { daysOfTheWeek } from '../helpers/helperVariables';
import { groupByProperty } from '../helpers/helperFunctions';
import ItemsCategory from './ItemsCategory';
import toast from 'react-hot-toast';

const StyledHistoryList = styled.div`
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

  @media screen and (max-width: 1024px) {
    padding: 0 2.4rem;
  }

  @media screen and (max-width: 480px) {
    padding: 0 1.24rem;
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
  color: var(--color-grey-500);
  margin-right: 1rem;
`;

const Container = styled.div`
  margin-top: 5rem;
`;

const ListDate = styled.span`
  color: var(--color-grey-300);
  font-size: 1.2rem;
  font-weight: 500;
`;

// HistoryList component displays the details of a specific history list.
// It retrieves the list details based on the listId parameter from the URL,
// groups the items based on category, and displays them.
function HistoryList() {
  // Get the id of the history list from the URL params
  const { listId } = useParams();

  // Fetch the details of the specified list
  const { list, isLoading, error } = useGetHistoryList(listId);

  // Display loading spinner while fetching data
  if (isLoading) return <Spinner />;

  // Display error toast if data fetching fails
  if (error) return toast.error(error.message);

  // Group the items based on their category
  const availableCategories = groupByProperty(
    list.at(0).shopping_list,
    'category'
  );

  // Format the completion date of the list
  const listDate = new Date(list.at(0).completed_at);
  const listFullDate = `${
    daysOfTheWeek[listDate.getDay()]
  } ${listDate.getDate()}.${
    listDate.getMonth() + 1
  }.${listDate.getFullYear()} `;

  return (
    <StyledHistoryList>
      {/* Render a back button with custom margins */}
      <BackButton marginTop="3.71rem" marginBottom="3.2rem" />

      {/* Display the name of the list */}
      <Name>{list.at(0).name}</Name>

      {/* Display the date of completion */}
      <DateOfCompletion>
        <CalendarIcon />
        <ListDate>{listFullDate}</ListDate>
      </DateOfCompletion>

      {/* Container to display items grouped by category */}
      <Container>
        {/* Iterate over available categories and render items for each */}
        {Object.keys(availableCategories)?.map(key => (
          <ItemsCategory marginbottom="6.47rem" key={key}>
            {/* Render category title */}

            <ItemsCategory.Title>{key}</ItemsCategory.Title>

            {/* Render items for the current category */}
            <ItemsCategory.Container>
              {availableCategories[key].map(item => {
                return <ListItem itemDetails={item} key={item.id} />;
              })}
            </ItemsCategory.Container>
          </ItemsCategory>
        ))}
      </Container>
    </StyledHistoryList>
  );
}

export default HistoryList;
