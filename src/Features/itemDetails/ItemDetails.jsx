import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { useGetItemDetails } from '../../Hooks/useGetItemDetails';
import Spinner from '../../UI/Spinner';
import { useDeleteItem } from '../../Hooks/useDeleteItem';
import { useGetAppData } from '../../Context/AppContext';
import BackButton from '../../UI/BackButton';

const StyledItemDetails = styled.div`
  background-color: var(--color-white);
  padding: 0 4.45rem 0 4.41rem;

  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  overflow: hidden;

  @media screen and (max-width: 480px) {
    height: 100%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 2.5rem;
  overflow: hidden;
  margin-bottom: 5.37rem;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.04);
`;

const EmptyImage = styled.div`
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  background-color: var(--color-gray-300);
  border-radius: 2.5rem;
  margin-bottom: 5.37rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.8rem;
  color: var(--color-white);
  font-weight: 700;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.04);
`;

const NameTag = styled.p`
  color: var(--color-gray-300);

  font-size: 1.2rem;

  font-weight: 500;

  margin-bottom: 1.15rem;
`;

const Name = styled.p`
  color: var(--color-black);
  font-size: 2.4rem;
  font-weight: 500;
  margin-bottom: 3.33rem;
  text-transform: capitalize;
`;
const Category = styled.p`
  color: var(--color-black);
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 3.61rem;
`;
const Note = styled.p`
  color: var(--color-black);
  font-size: 1.8rem;
  font-weight: 500;
  line-height: normal;
`;

const DetailsContaner = styled.div`
  overflow-y: scroll;
  height: 100%;

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

const Delete = styled.button`
  color: var(--color-title);

  font-size: 1.6rem;
  padding: 2.06rem 2.42rem 2.06rem 2.52rem;
  font-weight: 700;
  transition: color 260ms ease-in-out;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    color: var(--color-gray-300);
  }
`;
const Add = styled.button`
  padding: 1.96rem 2.32rem 1.96rem 2.42rem;
  color: var(--color-white);
  font-size: 1.6rem;
  font-weight: 700;
  border-radius: 1.2rem;
  background-color: var(--color-accent);
  text-transform: capitalize;

  border: 0.2rem solid var(--color-accent);
  cursor: pointer;
  transition: color 260ms ease-in-out, background 260ms ease-in-out;
  &:hover {
    background-color: transparent;
    color: var(--color-accent);
  }
`;

function ItemDetails() {
  const { itemId } = useParams();
  const { itemDetails, isLoading, error } = useGetItemDetails(itemId);
  const navigate = useNavigate();
  const {
    deleteItem,
    isLoading: isDeleting,
    error: deleteError,
  } = useDeleteItem();

  const { items, isLoadingAllItems, allItemsError, addItemToList } =
    useGetAppData();

  function onDelete() {
    if (isLoading) return;
    deleteItem(id);
    navigate('/items');
  }

  function onAddToList() {
    if (isLoadingAllItems || isLoading) return;
    // takes in only the item to add to the list
    addItemToList(itemDetails.at(0));
    navigate('/items');
  }

  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message}</p>;
  const { id, name, image, note, category } = itemDetails.at(0);

  return (
    <StyledItemDetails>
      <BackButton />
      <DetailsContaner>
        {image ? <Image src={image} /> : <EmptyImage>No image</EmptyImage>}

        <NameTag>name</NameTag>
        <Name>{name} </Name>
        <NameTag>category</NameTag>
        <Category>{category} </Category>
        <NameTag>note</NameTag>
        <Note>{note ? note : 'You left no note, consider adding one!'} </Note>
      </DetailsContaner>
      <ButtonsContainer>
        <Delete onClick={onDelete}>delete</Delete>
        <Add onClick={onAddToList}>Add to list</Add>
      </ButtonsContainer>
    </StyledItemDetails>
  );
}

export default ItemDetails;
