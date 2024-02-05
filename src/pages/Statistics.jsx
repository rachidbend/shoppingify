import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useGetHistory } from '../Hooks/useGetHistory';
import Spinner from '../UI/Spinner';
import TopItemsOrCategories from '../UI/TopItemsOrCategories';
import { eachMonthOfInterval, format, isSameMonth, subMonths } from 'date-fns';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useMobileSide } from '../Context/MobileSideContext';
import {
  extractNamesAndCategories,
  generateFilteredLists,
} from '../helpers/helperFunctions';

const StyledStatistics = styled(motion.div)`
  padding: 0rem 7.77rem 0rem 11.13rem;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  overflow-y: scroll;

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
    padding-right: 2.3rem;
    padding-bottom: 2.4rem;
  }
`;
const ChildrenContainer = styled(motion.div)``;

const Title = styled.h2`
  color: var(--color-black);
  font-size: 2.4rem;
  font-weight: 500;
  margin-bottom: 3.84rem;

  @media screen and (max-width: 1024px) {
    font-size: 2.2rem;
    margin-bottom: 3rem;
  }

  @media screen and (max-width: 780px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 2.23rem;
  }
`;

const TopContainer = styled.div`
  margin-top: 5.27rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6.51rem;
  margin-bottom: 6.5rem;

  @media screen and (max-width: 1024px) {
    gap: 3.4rem;
  }

  @media screen and (max-width: 780px) {
    gap: 4rem;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    margin-top: 2.84rem;
    margin-bottom: 3.31rem;
    gap: 3.31rem;
  }
`;
const TopItemsContainer = styled.div``;
const TopCategoriesContainer = styled.div``;

const ChartContianer = styled.div`
  margin-bottom: 4rem;
`;

function Statistics() {
  const { history, isLoading, error } = useGetHistory();
  const { isMobile } = useMobileSide();

  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message}</p>;

  // getting all the names of the all the items in the history

  // Getting all the names of all the items in the history
  const allItemsNames = extractNamesAndCategories(history, 'name');
  const filteredNameLists = generateFilteredLists(allItemsNames);

  // Getting all the names of all the categories in all the items in the history
  const allCategoryNames = extractNamesAndCategories(history, 'category');
  const filteredCategories = generateFilteredLists(allCategoryNames);

  // Convert the object into an array of key-value pairs
  const convertToObjectArray = inputObject => Object.entries(inputObject);
  // Sort the array based on the length of each value array and take top N items
  const getTopItems = (array, limit) =>
    array.sort((a, b) => b[1].length - a[1].length).slice(0, limit);

  // Organize the history by month and year
  const organizeHistoryByMonth = (history, monthsToDisplay) => {
    const allMonths = eachMonthOfInterval({
      start: subMonths(new Date(), monthsToDisplay - 1),
      end: new Date(),
    });

    const data = allMonths.map(month => {
      const monthName = format(month, 'MMMM');
      const itemsCount = history
        .filter(list => isSameMonth(month, new Date(list.completed_at)))
        .reduce((acc, cur) => acc + cur.shopping_list.length, 0);

      return { name: monthName, items: itemsCount };
    });

    return data;
  };

  // Get top N items based on their length
  const topItems = getTopItems(convertToObjectArray(filteredNameLists), 3);
  const topCategories = getTopItems(
    convertToObjectArray(filteredCategories),
    3
  );

  // Organize the history by month for the last 6 months
  const data = organizeHistoryByMonth(history, 6);

  return (
    <StyledStatistics>
      <ChildrenContainer>
        <TopContainer>
          <TopItemsContainer>
            <Title>Top items</Title>
            <div>
              {topItems.map(item => (
                <TopItemsOrCategories
                  name={item[0]}
                  itemNumber={item[1].length}
                  totalNumber={allItemsNames.length}
                  color={'var(--color-accent)'}
                  key={item[0]}
                />
              ))}
            </div>
          </TopItemsContainer>
          <TopCategoriesContainer>
            <Title>Top categories</Title>
            <div>
              {topCategories.map(item => (
                <TopItemsOrCategories
                  name={item[0]}
                  itemNumber={item[1].length}
                  totalNumber={allCategoryNames.length}
                  color={'var(--color-blue)'}
                  key={item[0]}
                />
              ))}
            </div>
          </TopCategoriesContainer>
        </TopContainer>
        <ChartContianer>
          <Title>Monthly Summary</Title>
          <ResponsiveContainer width={'100%'} height={302}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                color="var(--color-gray-500)"
                fontSize="1.4rem"
                dataKey="name"
                angle={isMobile ? 90 : 0}
                tickMargin={isMobile ? 40 : 0}
                padding="gap"
                height={isMobile ? 90 : 30}
                strokeDasharray="3 3"
              />
              <YAxis
                color="var(--color-gray-500)"
                fontSize="1.4rem"
                strokeDasharray="3 3"
              />
              <Line
                type="monotone"
                dataKey="items"
                stroke="var(--color-accent)"
              />
              <Tooltip
                contentStyle={{
                  fontSize: '1.6rem',
                  borderRadius: '1.2rem',
                }}
              />
              <Legend fontSize="1.6rem" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContianer>
      </ChildrenContainer>
    </StyledStatistics>
  );
}

export default Statistics;
