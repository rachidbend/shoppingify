/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
import { MdDeleteOutline } from 'react-icons/md';
import { MdAdd } from 'react-icons/md';
import { MdOutlineRemove } from 'react-icons/md';
import { MdCheck } from 'react-icons/md';

// item
const StyledShoppingItem = styled(motion.div)`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  flex-wrap: nowrap;
  flex-grow: 0;
  flex-shrink: 0;
  margin-bottom: 1rem;
  min-height: 4.4903rem;
`;
// item name
const Name = styled(motion.p)`
  color: var(--color-black);
  font-size: 1.8rem;
  font-weight: 500;

  text-decoration: ${props =>
    props.ischecked === 'true' ? 'line-through' : 'none'};
`;
// item qantity
const Quantity = styled(motion.button)`
  color: var(--color-accent);
  font-size: 1.2rem;
  font-weight: 700;

  background: none;
  border-radius: 2.4rem;
  border: 0.2rem solid var(--color-accent);
  width: 6.8rem;
  height: 3.2rem;
  text-align: center;
  margin: 0 0.4rem;

  cursor: pointer;
`;
const QuantityPcs = styled.span`
  font-weight: 500;
`;

// item editing
const Button = styled(motion.button)`
  border: none;
  background: none;
  position: relative;
`;
const ItemEditContianer = styled(motion.div)`
  border-radius: 1.2rem;
  background-color: ${props =>
    props.edit === true ? 'var(--color-white)' : 'transparent'};
  padding-right: 0.4rem;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  margin-left: auto;
`;

const ItemIncreaseQuantity = styled(Button)``;
const ItemDecreaseQuantity = styled(Button)``;
const ItemDelete = styled(Button)`
  background-color: var(--color-accent);
  height: 4.4903rem;
  border-radius: 1.2rem;
  padding: 0 0.95rem;
`;
const TrashIcon = styled(MdDeleteOutline)`
  color: var(--color-white);
  width: 1.8rem;
  height: 1.8rem;
`;
const AddIcon = styled(MdAdd)`
  width: 2.4rem;
  height: 2.4rem;
  color: var(--color-accent);
`;
const RemoveIcon = styled(MdOutlineRemove)`
  width: 2.4rem;
  height: 2.4rem;
  color: var(--color-accent);
`;

// chech if an item is purchased
const PurchasedCheckbox = styled.input`
  appearance: none;
  height: 2.4rem;
  width: 2.4rem;
  position: absolute;
  top: 0;
  left: 0;
`;

const PurchasedCheckboxCustom = styled.span`
  display: inline-block;
  height: 2.4rem;
  width: 2.4rem;
  border: 0.2rem solid var(--color-accent);
  border-radius: 0.4rem;
  margin-right: 1.51rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckedIcon = styled(MdCheck)`
  color: var(--color-accent);
  width: 100%;
  height: 100%;

  display: ${props => (props.ischecked === 'true' ? 'inline-block' : 'none')};
  opacity: ${props => (props.ischecked === 'true' ? 1 : 0)};
`;

const PurchasedCheckboxContainer = styled.div`
  position: relative;
`;

function ShoppingItem({
  item,
  onUpdateQuantity,
  onDelete,
  isEditing,
  onPurchase,
}) {
  const [showEdit, setSHowEdit] = useState(false);

  function handleShowEdit() {
    if (isEditing === false) {
      setSHowEdit(false);
      return;
    } else {
      setSHowEdit(!showEdit);
    }
  }
  // itemId, incease
  return (
    <StyledShoppingItem
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.2,
      }}
      key={`shopping itel ${item.id}`}
    >
      {!isEditing && (
        <PurchasedCheckboxContainer>
          <PurchasedCheckbox
            checked={item.isPurchased}
            onChange={() =>
              onPurchase(item.id, item.isPurchased ? false : true)
            }
            type="checkbox"
          />
          <PurchasedCheckboxCustom>
            <CheckedIcon ischecked={item.isPurchased ? 'true' : 'false'} />
          </PurchasedCheckboxCustom>
        </PurchasedCheckboxContainer>
      )}

      <Name ischecked={item.isPurchased ? 'true' : 'false'} layout>
        {item.name}{' '}
      </Name>

      <ItemEditContianer
        initial={{
          width: 'auto',
          backgroundColor: 'transparent',
        }}
        animate={{
          width: showEdit ? 'auto' : 'auto',

          backgroundColor: showEdit
            ? 'rgba(255,255,255, 1)'
            : 'rgba(255,255,255, 0)',
        }}
        transition={{
          duration: 0.6,
          delay: 0.2,
        }}
        edit={showEdit}
      >
        <AnimatePresence>
          {showEdit && (
            <ItemDelete
              layout
              key={`delete-${item.id}`}
              initial={{
                opacity: 0,
                left: '1rem',
              }}
              animate={{
                opacity: 1,
                left: '0rem',
              }}
              transition={{
                duration: 0.4,
                delay: 0,
              }}
              exit={{
                opacity: 0,
                left: '1rem',
              }}
              onClick={() => onDelete(item.id)}
            >
              <TrashIcon />
            </ItemDelete>
          )}
          {showEdit && (
            <ItemDecreaseQuantity
              layout
              key={`decrease-${item.id}`}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() => onUpdateQuantity(item.id, false)}
            >
              <RemoveIcon />
            </ItemDecreaseQuantity>
          )}
          <Quantity layout onClick={handleShowEdit}>
            {item.quantity}
            <QuantityPcs> pcs</QuantityPcs>
          </Quantity>
          {showEdit && (
            <ItemIncreaseQuantity
              layout
              key={`increase-${item.id}`}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() => onUpdateQuantity(item.id, true)}
            >
              <AddIcon />
            </ItemIncreaseQuantity>
          )}
        </AnimatePresence>
      </ItemEditContianer>
    </StyledShoppingItem>
  );
}

export default ShoppingItem;
