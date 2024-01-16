/* eslint-disable react/prop-types */
import { AnimatePresence, color, motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
import { MdDeleteOutline } from 'react-icons/md';
import { MdAdd } from 'react-icons/md';
import { MdOutlineRemove } from 'react-icons/md';

// item
const StyledShoppingItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  flex-grow: 0;
  flex-shrink: 0;
  margin-bottom: 1rem;
  min-height: 4.4903rem;
`;
// item name
const Name = styled.p`
  color: var(--color-black);
  font-size: 1.8rem;
  font-weight: 500;
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

function ShoppingItem({ item }) {
  const [showEdit, setSHowEdit] = useState(false);

  function handleShowEdit() {
    setSHowEdit(!showEdit);
  }

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
      <Name>{item.name} </Name>

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
