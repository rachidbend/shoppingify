import { useParams } from 'react-router';
import styled from 'styled-components';

const StyledItemDetails = styled.div``;

function ItemDetails() {
  const { itemId } = useParams();
  console.log(itemId);

  return <StyledItemDetails>ItemDetails</StyledItemDetails>;
}

export default ItemDetails;
