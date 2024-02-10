/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useUpdateAvatar } from '../Hooks/useUpdateAvatar';
import { useState } from 'react';
import { useUploadUserAvatar } from '../Hooks/useUploadUserAvatar';
import { useGetAllAvatars } from '../Hooks/useGetAllAvatars';
import Spinner from './Spinner';
import { MdClose } from 'react-icons/md';
import { motion } from 'framer-motion';
import { MdFileUpload } from 'react-icons/md';
import toast from 'react-hot-toast';

const StyledAvatarUpdateModal = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  font-family: var(--font-main);
`;

const Overlay = styled(motion.div)`
  height: 100vh;
  width: 100%;
  background-color: var(--color-backgound-modal-overlay);
  position: absolute;

  top: 0;
  left: 0;
`;

const AvatarChooseImage = styled.img`
  height: 4.8rem;
  width: auto;
  cursor: pointer;

  transform: scale(100%);

  transition: transform var(--transition-simple);
  &:hover {
    transform: scale(115%);
  }
`;

const AvatarChooseContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  max-height: 16rem;
  overflow-y: scroll;
`;
const AvatarChangeContainer = styled(motion.div)`
  width: 66rem;
  padding: 4.8rem;
  background-color: var(--color-white);
  padding-top: 2.4rem;
  border-radius: 2.4rem;
  box-shadow: var(--shadow-item);

  @media screen and (max-width: 780px) {
    width: 100%;
    transform: scale(85%);
  }
`;

const TextChoose = styled.p`
  color: var(--color-black);
  font-size: 1.6rem;
  margin-bottom: 1.2rem;
  margin-top: 1.2rem;
  font-weight: 500;

  &::first-child {
    margin-top: 0;
  }
`;

const Input = styled.input`
  font-size: 1.4rem;
  font-weight: 500;
  width: auto;
  padding: 2.16rem 1.8rem;
  border: 0.2rem solid var(--color-grey-200);
  border-radius: 0.8rem;
  background: transparent;
  outline: none;

  width: 100%;

  transition: border var(--transition-input);

  &:focus,
  &:hover {
    border: 0.2rem solid var(--color-accent);
  }
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 2.8rem;
  padding-bottom: 1.6rem;
  border-bottom: 0.1rem solid var(--color-grey-200);

  display: ${props => (props.display ? props.display : 'block')};

  justify-content: ${props =>
    props.justifycontent ? props.justifycontent : 'start'};

  &:last-child() {
    margin-bottom: 0;
  }

  @media screen and (max-width: 780px) {
    display: block;
  }
`;

const SaveButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;

  font-size: 1.4rem;
  background-color: var(--color-accent);
  border: 0.2rem solid var(--color-accent);
  border-radius: 0.8rem;
  color: var(--color-white);
  padding: 2rem 2.5rem;
  font-weight: 700;
  text-transform: capitalize;

  transition: color var(--transition-button),
    background-color var(--transition-button);

  &:hover {
    background-color: var(--color-white);
    color: var(--color-accent);
  }
`;

const CloseContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const CloseIcon = styled(MdClose)`
  width: 3.2rem;
  height: 3.2rem;
  color: var(--color-grey-400);
  padding: 0.4rem;
  cursor: pointer;
  &:hover {
    color: var(--color-accent);
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const FileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;
const FileLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  padding: 0.8rem 2rem;
  padding-left: 1.8rem;
  border-radius: 0.6rem;

  background-color: var(--color-accent);
  color: var(--color-white);
  cursor: pointer;
  display: inline-block;
  border: 0.2rem solid var(--color-accent);

  transition: color var(--transition-button),
    background-color var(--transition-button);

  &:hover {
    background-color: transparent;
    color: var(--color-accent);
  }
`;
const FileLabelCOntainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
`;
const UploadIcon = styled(MdFileUpload)`
  color: inherit;
  height: 2rem;
  width: 2rem;
`;

// Component for updating avatar
function AvatarUpdateModal({ handleOpen }) {
  // State to store the avatar URL
  const [avatarUrl, setAvatarUrl] = useState('');

  // Custom hooks to update and upload user avatar
  const { updateAvatar } = useUpdateAvatar();
  const { uploadAvatar } = useUploadUserAvatar();

  // Custom hook to get all avatars
  const {
    avatars,
    isLoading: isLoadingAvatars,
    error: getAvatarError,
  } = useGetAllAvatars();

  // Handler to update avatar URL
  function handleAvatarUrl(e) {
    setAvatarUrl(e.target.value);
  }

  // Handler to choose an avatar by URL
  function handleChooseAvatar(url) {
    updateAvatar({ url: url });
    handleOpen(false);
  }

  // Handler to save entered avatar URL
  function onSaveAvatarUrl() {
    updateAvatar({ url: avatarUrl });
    handleOpen(false);
  }

  // Handler to upload avatar image
  function onAvatarUploadChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    uploadAvatar(file);
    handleOpen(false);
  }

  // Render loading spinner if avatars are loading
  if (isLoadingAvatars) return;
  // Render error toast if there's an error fetching avatars
  if (getAvatarError) toast.error(getAvatarError.message);

  // Render avatar update modal
  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <StyledAvatarUpdateModal>
        <AvatarChangeContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <CloseContainer>
            <CloseIcon onClick={() => handleOpen(false)} />
          </CloseContainer>
          <InputContainer>
            <TextChoose>Put in a URL</TextChoose>
            <InputWrapper>
              <Input
                placeholder="Image URL"
                type="text"
                value={avatarUrl}
                onChange={handleAvatarUrl}
              />
              <SaveButton
                onClick={() => {
                  onSaveAvatarUrl();
                }}
              >
                Save
              </SaveButton>
            </InputWrapper>
          </InputContainer>
          <InputContainer display="flex" justifycontent="space-between">
            <TextChoose>or upload an image</TextChoose>
            <FileInput
              onChange={onAvatarUploadChange}
              type="file"
              name="avatar_image"
              id="file-input"
            />
            <FileLabel htmlFor="file-input">
              <FileLabelCOntainer>
                <UploadIcon /> Choose a file...
              </FileLabelCOntainer>
            </FileLabel>
          </InputContainer>
          <InputContainer>
            <TextChoose>or choose an avatart</TextChoose>
            <AvatarChooseContainer>
              {avatars.map(avatar => (
                <AvatarChooseImage
                  onClick={() => handleChooseAvatar(avatar.url)}
                  key={`avatar-${avatar.id}`}
                  src={avatar.url}
                />
              ))}
            </AvatarChooseContainer>
          </InputContainer>
        </AvatarChangeContainer>
      </StyledAvatarUpdateModal>
    </Overlay>
  );
}

export default AvatarUpdateModal;
