/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MdEventNote } from 'react-icons/md';
import { daysOfTheWeek } from '../helpers/helperVariables';
import { MdArrowForwardIos } from 'react-icons/md';

const StyledList = styled(Link)`
  background-color: var(--color-white);
  border-radius: 1.2rem;
  box-shadow: var(--shadow-item);
  padding: 2.2rem 1.66rem 2.15rem 2.07rem;

  display: flex;
  flex-wrap: nowrap;
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;

  @media screen and (max-width: 1024px) {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 1fr auto auto;

    padding: 1.6rem 1rem 1.6rem 1.4rem;
  }

  @media screen and (max-width: 780px) {
    display: flex;
    flex-wrap: nowrap;

    justify-content: flex-start;
    align-items: center;
    text-decoration: none;
  }

  @media screen and (max-width: 480px) {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 1fr auto auto;

    padding: 1.6rem 1rem 1.6rem 1.4rem;
  }
`;

const ListName = styled.p`
  font-size: 1.6rem;
  color: var(--color-black);
  font-weight: 500;

  @media screen and (max-width: 1024px) {
    text-align: left;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    margin-bottom: 0.6rem;
    font-size: 1.4rem;
  }

  @media screen and (max-width: 780px) {
  }

  @media screen and (max-width: 480px) {
    text-align: left;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    margin-bottom: 0.6rem;
    font-size: 1.4rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-grow: 0;
  flex-shrink: 0;
  align-items: center;
  margin-left: auto;
  width: 14.13rem;

  @media screen and (max-width: 1024px) {
    margin-left: 0;
    width: auto;
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }

  @media screen and (max-width: 780px) {
    display: flex;
    flex-wrap: nowrap;
    flex-grow: 0;
    flex-shrink: 0;
    align-items: center;
    margin-left: auto;
    width: 14.13rem;
  }

  @media screen and (max-width: 480px) {
    margin-left: 0;
    width: auto;
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }
`;

const CalendarIcon = styled(MdEventNote)`
  width: 2.4rem;
  height: 2.4rem;
  color: var(--color-grey-500);
  margin-right: 1rem;

  @media screen and (max-width: 480px) {
    margin-right: 0.4rem;
  }
`;

const DateOfCompletion = styled.p``;

const ListDate = styled.span`
  color: var(--color-grey-300);
  font-size: 1.2rem;
  font-weight: 500;
`;

const TagContainer = styled.div`
  margin-left: 2.63rem;
  margin-right: 3.27rem;
  width: 7.5992rem;

  @media screen and (max-width: 1024px) {
    width: 7.5992rem;
    margin: 0;
    grid-column: 2 / 3;
    grid-row: 1 / 3;
  }

  @media screen and (max-width: 780px) {
  }

  @media screen and (max-width: 480px) {
    width: 7.5992rem;
    margin: 0;
    grid-column: 2 / 3;
    grid-row: 1 / 3;
  }
`;

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
  text-align: center;
`;

const ArrowIcon = styled(MdArrowForwardIos)`
  height: 1.49rem;
  width: auto;
  color: var(--color-accent);

  @media screen and (max-width: 1024px) {
    grid-column: 3 / 4;
    grid-row: 1 / 3;
    margin-left: 1rem;
  }

  @media screen and (max-width: 780px) {
  }

  @media screen and (max-width: 480px) {
    grid-column: 3 / 4;
    grid-row: 1 / 3;
    margin-left: 1rem;
  }
`;

// Component for rendering a single item in the history list.
function List({ list }) {
  // Format the date of completion for display
  const formattedDate = `${
    daysOfTheWeek[new Date(list.completed_at).getDay()]
  } ${new Date(list.completed_at).getDate()}.${
    new Date(list.completed_at).getMonth() + 1
  }.${new Date(list.completed_at).getFullYear()} `;

  return (
    <StyledList to={`/history/${list.id}`} key={list.id}>
      {/* Display the name of the list */}
      <ListName>{list.name}</ListName>
      {/* Display the date of completion */}
      <Container>
        <CalendarIcon />
        <DateOfCompletion>
          <ListDate>{formattedDate}</ListDate>
        </DateOfCompletion>
      </Container>
      {/* Display the tag indicating completion status */}
      <TagContainer>
        <ListTag iscompleted={list.is_completed ? 'true' : 'false'}>
          {list.is_completed ? 'completed' : 'canceled'}
        </ListTag>
      </TagContainer>
      {/* Arrow icon for navigation */}
      <ArrowIcon />
    </StyledList>
  );
}

export default List;
