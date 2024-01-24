import { motion } from 'framer-motion';
import styled from 'styled-components';
import { childrenVariants, routeVariants } from '../Variables/variables';
import { useGetHistory } from '../Hooks/useGetHistory';
import Spinner from '../UI/Spinner';
import TopItemsOrCategories from '../UI/TopItemsOrCategories';
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

const fakeDate = [
  {
    name: 'January',
    items: 35,
  },
  {
    name: 'February',
    items: 120,
  },
  {
    name: 'March',
    items: 34,
  },
  {
    name: 'April',
    items: 10,
  },
  {
    name: 'May',
    items: 30,
  },
  {
    name: 'June',
    items: 15,
  },
  {
    name: 'July',
    items: 45,
  },
];

function Statistics() {
  const { history, isLoading, error } = useGetHistory();

  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message}</p>;

  const allItemsNames = history.reduce((acc, list) => {
    const { shopping_list } = list;
    let names = shopping_list.map(item => item.name);
    return [...acc, ...names];
  }, []);

  const allCategoryNames = history.reduce((acc, list) => {
    const { shopping_list } = list;
    let categories = shopping_list.map(item => item.category);

    return [...acc, ...categories];
  }, []);

  const filteredNameLists = allItemsNames.reduce((accumulator, name) => {
    // Check if the category is already a key in the accumulator
    if (!accumulator[name]) {
      accumulator[name] = [];
    }

    // Push the current object to the array corresponding to the category
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
  // console.log(topItems);
  // console.log(allItemsNames.length);
  console.log(topCategories);
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
            <LineChart data={fakeDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                color="var(--color-gray-500)"
                fontSize="1.4rem"
                dataKey="name"
              />
              <YAxis color="var(--color-gray-500)" fontSize="1.4rem" />
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
