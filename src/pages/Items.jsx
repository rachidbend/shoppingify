import { motion } from 'framer-motion';
import styled from 'styled-components';
import { childrenVariants, routeVariants } from '../Variables/variables';
import { useGetAllItems } from '../Hooks/useGetAllItems';
import Item from '../UI/Item';

const StyledItems = styled(motion.div)`
  /* background-color: yellow; */
  padding: 0 8rem;
`;

const ChildrenContainer = styled(motion.div)``;

const Title = styled.h1`
  color: var(--color-title);

  font-size: 2.6rem;

  font-weight: 500;
  margin-bottom: 5.71rem;
  margin-top: 3.75rem;
`;

const TitleAccent = styled.span`
  color: var(--color-accent);

  font-weight: 700;
`;

const CategoryTitle = styled.h2`
  color: var(--color-black);
  margin-bottom: 1.8rem;
  font-size: 1.8rem;

  font-weight: 500;
`;

const CategoryContainer = styled.div`
  margin-bottom: 4.6rem;
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

function Items() {
  const { items, isLoading, error } = useGetAllItems();

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;

  //  chat gpt's help
  const resultObject = items.reduce((accumulator, currentObject) => {
    const { category } = currentObject;

    // Check if the name is already a key in the accumulator
    if (!accumulator[category]) {
      accumulator[category] = [];
    }

    // Push the current object to the array corresponding to the name
    accumulator[category].push(currentObject);

    return accumulator;
  }, {});

  return (
    <StyledItems variants={routeVariants} initial="initial" animate="final">
      <ChildrenContainer
        variants={childrenVariants}
        initial="initial"
        animate="final"
      >
        <Title>
          <TitleAccent>Shoppingify </TitleAccent>
          allows you take your shopping list wherever you go
        </Title>

        {Object.keys(resultObject).map(key => {
          return (
            <CategoryContainer key={key}>
              <CategoryTitle>{key}</CategoryTitle>
              <CategoryItemsContianer>
                {resultObject[key].map(item => {
                  return <Item id={item.id} name={item.name} key={item.id} />;
                })}
              </CategoryItemsContianer>
            </CategoryContainer>
          );
        })}
      </ChildrenContainer>
    </StyledItems>
  );
}

export default Items;
