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
  color: var(--color-grey-300);
  font-size: 1.2rem;
  font-weight: 500;
`;

function HistoryList() {
  // gets the id of the history list that it should display
  const { listId } = useParams();
  // then geys the details of that list
  const { list, isLoading, error } = useGetHistoryList(listId);

  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message} </p>;

  // then groupes the items based on the category
  const availableCategories = groupByProperty(
    list.at(0).shopping_list,
    'category'
  );

  // get the date where it was created and format it correclty
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
          <ItemsCategory marginbottom="6.47rem" key={key}>
            <ItemsCategory.Title>{key}</ItemsCategory.Title>
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
