/* eslint-disable react/prop-types */
import styled from 'styled-components';
import illustration from './../../assets/source.svg';
import { useSidePage } from '../../Context/SidePageProvider';

const StyledAddItem = styled.div`
  border-radius: 2.4rem;
  padding: 1.78rem 2.76rem 1.85rem 1.26rem;
  background-color: var(--color-shopping-add-item-background);
  position: relative;
  @media screen and (max-width: 480px) {
    padding: 1.63rem 2.53rem 1.69rem 1rem;
  }
`;

const AddItemIllustration = styled.img`
  height: 13.6rem;
  width: auto;
  position: absolute;
  top: -1.68rem;
`;
const AddItemParagraph = styled.p`
  color: var(--color-white);

  font-size: 1.6rem;
  margin-bottom: 1.36rem;
  font-weight: 700;
  margin-left: 10.95rem; /* 12.21rem - 1.26rem */

  @media screen and (max-width: 480px) {
    margin-left: 10.19rem; /* 11.19rem - 1rem */
  }
`;

const AddItemButton = styled.button`
  background-color: var(--color-white);
  color: var(--color-title);
  padding: 0.9rem 2.75rem;
  border: none;
  font-weight: 700;
  font-size: 1.4rem;
  border-radius: 1.2rem;
  cursor: pointer;
  margin-left: 10.95rem; /* 12.21rem - 1.26rem */
  box-shadow: var(--shadow-100);

  border: 0.1rem solid var(--color-white);

  transition: var(--transition-button);

  &:hover {
    color: var(--color-white);
    background-color: transparent;
  }

  @media screen and (max-width: 480px) {
    margin-left: 10.19rem; /* 11.19rem - 1rem */
  }
`;

function AddItem() {
  const { handleChangePage } = useSidePage();

  return (
    <StyledAddItem>
      <AddItemIllustration src={illustration} />
      <div>
        <AddItemParagraph>Didn&apos;t find what you need?</AddItemParagraph>
        <AddItemButton onClick={() => handleChangePage('add-new-item')}>
          Add item
        </AddItemButton>
      </div>
    </StyledAddItem>
  );
}

export default AddItem;
