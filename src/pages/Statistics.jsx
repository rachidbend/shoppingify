import { motion } from 'framer-motion';
import styled from 'styled-components';
import { childrenVariants, routeVariants } from '../Variables/variables';
import { useGetHistory } from '../Hooks/useGetHistory';
import Spinner from '../UI/Spinner';
import TopItemsOrCategories from '../UI/TopItemsOrCategories';
import {
  addMonths,
  eachMonthOfInterval,
  format,
  isSameMonth,
  subMonths,
} from 'date-fns';
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

const StyledStatistics = styled(motion.div)`
  /* background-color: green; */
  padding: 0rem 7.77rem 0rem 11.13rem;
`;
const ChildrenContainer = styled(motion.div)``;

const Title = styled.h2`
  color: var(--color-black);
  font-size: 2.4rem;
  font-weight: 500;
  margin-bottom: 3.84rem;
`;

const TopContainer = styled.div`
  margin-top: 5.27rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6.51rem;
  margin-bottom: 6.5rem;
`;
const TopItemsContainer = styled.div``;
const TopCategoriesContainer = styled.div``;

const ChartContianer = styled.div``;

function Statistics() {
  const { history, isLoading, error } = useGetHistory();

  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message}</p>;

  // getting all the names of the all the items in the history
  const allItemsNames = history.reduce((acc, list) => {
    const { shopping_list } = list;
    let names = shopping_list.map(item => item.name);
    return [...acc, ...names];
  }, []);
  // getting all the names of the all the category in all the items in the history
  const allCategoryNames = history.reduce((acc, list) => {
    const { shopping_list } = list;
    let categories = shopping_list.map(item => item.category);
    return [...acc, ...categories];
  }, []);

  const filteredNameLists = allItemsNames.reduce((accumulator, name) => {
    // Check if the name is already a key in the accumulator
    if (!accumulator[name]) {
      accumulator[name] = [];
    }
    // Push the current object to the array corresponding to the name
    accumulator[name].push(name);
    return accumulator;
  }, {});

  const filteredCategories = allCategoryNames.reduce(
    (accumulator, category) => {
      // Check if the category is already a key in the accumulator
      if (!accumulator[category]) {
        accumulator[category] = [];
      }
      // Push the current object to the array corresponding to the category
      accumulator[category].push(category);
      return accumulator;
    },
    {}
  );

  // Convert the object into an array of key-value pairs
  const namesArray = Object.entries(filteredNameLists);
  const categoriesArray = Object.entries(filteredCategories);
  // Sort the array based on the length of each value array
  const topItems = namesArray
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 3);

  const topCategories = categoriesArray
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 3);

  // orgensing the history by month and year
  //  getting the months required, (current month, and past 6 months)
  const allMonths = eachMonthOfInterval({
    start: subMonths(new Date(), 6),
    end: new Date(),
  });
  // creating the data based on the months
  // for the .filter(), we get the lists that have been completed in the available months that we want to display
  // then we .reduce() to get the number of items in all of the lists that have been completed in a month
  const data = allMonths.map(month => {
    return {
      name: format(month, 'MMMM'),
      items: history
        .filter(list => isSameMonth(month, new Date(list.completed_at)))
        .reduce((acc, cur) => acc + cur.shopping_list.length, 0),
    };
  });

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
