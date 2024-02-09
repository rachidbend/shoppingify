import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { useGetItemDetails } from '../../Hooks/useGetItemDetails';
import Spinner from '../../UI/Spinner';
import { useDeleteItem } from '../../Hooks/useDeleteItem';
import { useGetAppData } from '../../Context/AppContext';
import BackButton from '../../UI/BackButton';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const StyledItemDetails = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  background-color: var(--color-white);
  padding: 0 4.45rem 0 4.41rem;
  overflow: hidden;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

const Image = styled(motion.img)`
  width: 100%;
  height: auto;
  border-radius: 2.5rem;
  margin-bottom: 5.37rem;
  box-shadow: var(--shadow-100);
  overflow: hidden;
`;

const ImagePlaceholder = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  font-size: 1.8rem;
  color: var(--color-white);
  font-weight: 700;
  background-color: var(--color-grey-300);
  border-radius: 2.5rem;
  margin-bottom: 5.37rem;
  box-shadow: var(--shadow-100);
`;

const DetailLabel = styled(motion.p)`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-grey-300);
  margin-bottom: 1.15rem;
`;

const ItemName = styled(motion.p)`
  font-size: 2.4rem;
  font-weight: 500;
  color: var(--color-black);
  margin-bottom: 3.33rem;
  text-transform: capitalize;
`;
const Category = styled(motion.p)`
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--color-black);
  margin-bottom: 3.61rem;
`;
const Note = styled(motion.p)`
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--color-black);
  line-height: normal;
`;

const DetailsContaner = styled(motion.div)`
  height: 100%;
  overflow-y: scroll;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.94rem;
  width: 100%;
  margin-bottom: 3.49rem;
  margin-top: 3.49rem;
`;

const DeleteButton = styled.button`
  font-size: 1.6rem;
  color: var(--color-title);
  font-weight: 700;
  padding: 2.06rem 2.42rem 2.06rem 2.52rem;
  background: none;
  border: none;
  cursor: pointer;

  transition: color var(--transition-button-text);
  &:hover {
    color: var(--color-grey-300);
  }
`;
const AddToListButton = styled.button`
  padding: 1.96rem 2.32rem 1.96rem 2.42rem;
  color: var(--color-white);
  font-size: 1.6rem;
  font-weight: 700;
  border-radius: 1.2rem;
  background-color: var(--color-accent);
  text-transform: capitalize;
  border: 0.2rem solid var(--color-accent);
  cursor: pointer;
  transition: color var(--transition-button),
    background var(--transition-button);
  &:hover {
    background-color: transparent;
    color: var(--color-accent);
  }
`;

const SpinnerContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: var(--color-background);
`;

const parentContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      delay: 0.2,
      duration: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const childrenVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeIn' } },
};

function ItemDetails() {
  // Extract itemId from URL parameters
  // if an itemId exists, then this component will be rendered, if not, it will not be displayed.
  const { itemId } = useParams();

  // Fetch item details using custom hook
  const {
    itemDetails,
    isLoading,
    error: itemDetailsError,
  } = useGetItemDetails(itemId);

  // Access navigation functionality from React Router
  const navigate = useNavigate();

  // Custom hook for deleting an item from the database
  const {
    deleteItem,
    isLoading: isDeleting,
    error: deleteError,
  } = useDeleteItem();

  // Custom hook to get the function to add the item to the shopping list
  const { isLoadingAllItems, allItemsError, addItemToList } = useGetAppData();

  // Function to handle item deletion
  function onDelete() {
    // Return if data is still loading or deletion is in progress
    if (isLoading) return;
    // Call deleteItem function with itemId
    deleteItem(id);
    // Navigate back to items page after deletion
    navigate('/items');
  }

  // Function to handle adding item to list
  function onAddToList() {
    // Return if data is still loading or adding to list is in progress
    if (isLoadingAllItems || isLoading) return;
    // Add item to list using addItemToList function
    // takes in only the item to add to the list
    addItemToList(itemDetails[0]);
    // Navigate back to items page after adding to list
    navigate('/items');
  }

  // Render spinner while data is loading
  if (isLoading)
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  // Render error message if there's an error fetching data
  if (itemDetailsError) toast.error(itemDetailsError.message);
  if (deleteError) toast.error(deleteError.message);
  if (allItemsError) toast.error(allItemsError.message);

  // Destructure itemDetails to access item properties
  const { id, name, image, note, category } = itemDetails[0];

  return (
    <StyledItemDetails>
      {/* Back button component */}
      <BackButton />
      {/* Render item image if available, otherwise show placeholder */}
      <DetailsContaner
        variants={parentContainerVariants}
        initial="hidden"
        animate="show"
      >
        {image ? (
          <Image variants={childrenVariants} src={image} />
        ) : (
          <ImagePlaceholder variants={childrenVariants}>
            No image
          </ImagePlaceholder>
        )}

        {/* Display item details */}
        <DetailLabel variants={childrenVariants}>name</DetailLabel>
        <ItemName variants={childrenVariants}>{name}</ItemName>
        <DetailLabel variants={childrenVariants}>category</DetailLabel>
        <Category variants={childrenVariants}>{category}</Category>
        <DetailLabel variants={childrenVariants}>note</DetailLabel>

        {/* Show note if available, otherwise display default message */}
        <Note variants={childrenVariants}>
          {note ? note : 'You left no note, consider adding one!'}
        </Note>
      </DetailsContaner>

      <ButtonsContainer>
        {/* Button to delete item */}
        <DeleteButton onClick={onDelete} disabled={isDeleting}>
          delete
        </DeleteButton>

        {/* Button to add item to list */}
        <AddToListButton onClick={onAddToList} disabled={isDeleting}>
          Add to list
        </AddToListButton>
      </ButtonsContainer>
    </StyledItemDetails>
  );
}

export default ItemDetails;
