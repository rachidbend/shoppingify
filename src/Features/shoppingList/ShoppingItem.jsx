/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { memo, useState } from 'react';
import styled from 'styled-components';
import { MdDeleteOutline } from 'react-icons/md';
import { MdAdd } from 'react-icons/md';
import { MdOutlineRemove } from 'react-icons/md';
import { MdCheck } from 'react-icons/md';

// item
const StyledItemContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  min-height: 4.4903rem;
  width: 100%;
`;

const ItemName = styled(motion.p)`
  color: var(--color-black);
  font-size: 1.8rem;
  font-weight: 500;

  text-decoration: ${props =>
    props.ischecked === 'true' ? 'line-through' : 'none'};

  @media screen and (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const Quantity = styled(motion.button)`
  width: 6.8rem;
  height: 3.2rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-accent);
  background: none;
  border-radius: 2.4rem;
  border: 0.2rem solid var(--color-accent);
  text-align: center;
  margin: 0 0.4rem;
  cursor: pointer;
`;

const QuantityPcs = styled.span`
  font-weight: 500;
`;

const Button = styled(motion.button)`
  border: none;
  background: none;
  position: relative;
`;

const EditContainer = styled(motion.div)`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  background-color: ${props =>
    props.edit === true ? 'var(--color-white)' : 'transparent'};
  padding-right: 0.4rem;
  border-radius: 1.2rem;
  margin-left: auto;
`;

const IncreaseQuantityButton = styled(Button)``;

const DecreaseQuantityButton = styled(Button)``;

const DeleteButton = styled(Button)`
  height: 4.4903rem;
  border-radius: 1.2rem;
  background-color: var(--color-accent);
  padding: 0 0.95rem;
`;

const TrashIcon = styled(MdDeleteOutline)`
  width: 1.8rem;
  height: 1.8rem;
  color: var(--color-white);
`;

const IncreaseIcon = styled(MdAdd)`
  width: 2.4rem;
  height: 2.4rem;
  color: var(--color-accent);
`;

const DecreaseIcon = styled(MdOutlineRemove)`
  width: 2.4rem;
  height: 2.4rem;
  color: var(--color-accent);
`;

const CheckboxInput = styled.input`
  appearance: none;
  height: 2.4rem;
  width: 2.4rem;
  position: absolute;
  top: 0;
  left: 0;
`;

const CheckboxCustom = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.4rem;
  width: 2.4rem;
  border: 0.2rem solid var(--color-accent);
  border-radius: 0.4rem;
  margin-right: 1.51rem;
`;

const CheckedIcon = styled(MdCheck)`
  width: 100%;
  height: 100%;
  color: var(--color-accent);
  display: ${props => (props.ischecked === 'true' ? 'inline-block' : 'none')};
  /* opacity: ${props => (props.ischecked === 'true' ? 1 : 0)}; */
`;

const CheckboxContainer = styled.div`
  position: relative;
`;

const ShoppingItem = memo(function OriginalShoppingItem({
  item,
  onUpdateQuantity,
  onDelete,
  isEditing,
  onPurchase,
}) {
  // State to manage whether the item is in edit mode
  const [isEditMode, setIsEditMode] = useState(false);

  // Function to toggle edit mode
  const handleShowEdit = () => {
    if (!isEditing) {
      setIsEditMode(false);
    } else {
      setIsEditMode(prevState => !prevState);
    }
  };

  // Function to handle checking/unchecking the purchased checkbox
  function handleCheck() {
    onPurchase(item.id, item.isPurchased ? false : true);
  }

  // Function to delete the item from the list
  function handleDelete() {
    onDelete(item.id);
  }

  // Function to update the quantity of the item
  function handleUpdateQuantity(increaseOrDecrease) {
    onUpdateQuantity(item.id, increaseOrDecrease);
  }

  return (
    <StyledItemContainer key={`shopping-itel-${item.id}`}>
      {/* Purchased Checkbox */}
      {!isEditing && (
        <CheckboxContainer>
          <CheckboxInput
            checked={item.isPurchased}
            onChange={handleCheck}
            type="checkbox"
          />
          <CheckboxCustom>
            <CheckedIcon ischecked={item.isPurchased ? 'true' : 'false'} />
          </CheckboxCustom>
        </CheckboxContainer>
      )}

      {/* Item Name */}
      <ItemName ischecked={item.isPurchased ? 'true' : 'false'}>
        {item.name}
      </ItemName>

      {/* Item Edit Container */}
      <EditContainer edit={isEditMode}>
        {/* Delete Item Button */}
        {isEditMode && (
          <DeleteButton key={`delete-${item.id}`} onClick={handleDelete}>
            <TrashIcon />
          </DeleteButton>
        )}

        {/* Decrease Quantity Button */}
        {isEditMode && (
          <DecreaseQuantityButton
            key={`decrease-${item.id}`}
            onClick={() => handleUpdateQuantity(false)}
          >
            <DecreaseIcon />
          </DecreaseQuantityButton>
        )}

        {/* Quantity Button */}
        <Quantity onClick={handleShowEdit}>
          {item.quantity}
          <QuantityPcs> pcs</QuantityPcs>
        </Quantity>

        {/* Increase Quantity Button */}
        {isEditMode && (
          <IncreaseQuantityButton
            key={`increase-${item.id}`}
            onClick={() => handleUpdateQuantity(true)}
          >
            <IncreaseIcon />
          </IncreaseQuantityButton>
        )}
      </EditContainer>
    </StyledItemContainer>
  );
});

export default ShoppingItem;
