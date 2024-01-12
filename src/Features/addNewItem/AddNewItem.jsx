import styled from 'styled-components';

const StyledAddNewItem = styled.div``;

function AddNewItem({ onchangePage }) {
  return (
    <StyledAddNewItem>
      <p onClick={() => onchangePage('shopping-list')}>go back</p>
      AddNewItem
    </StyledAddNewItem>
  );
}

export default AddNewItem;
