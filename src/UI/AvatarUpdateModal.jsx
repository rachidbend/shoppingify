import styled from 'styled-components';
import { useUpdateAvatar } from '../Hooks/useUpdateAvatar';
import { useState } from 'react';
import { useUploadUserAvatar } from '../Hooks/useUploadUserAvatar';
import { useGetAllAvatars } from '../Hooks/useGetAllAvatars';
import Spinner from './Spinner';

const StyledAvatarUpdateModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  font-family: var(--font-main);
`;

const Overlay = styled.div`
  height: 100vh;
  width: 100%;
  background-color: var(--color-backgound-modal-overlay);
  position: absolute;

  top: 0;
  left: 0;
`;

const AvatarChooseImage = styled.img`
  height: 4em;
  width: auto;
`;

const AvatarChooseContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
`;
const AvatarChangeContainer = styled.div`
  width: 66rem;
  padding: 4.8rem;
  background-color: var(--color-white);

  border-radius: 2.4rem;
  box-shadow: var(--shadow-100);

  /* input {
    width: 100%;
  } */

  @media screen and (max-width: 780px) {
    width: 80%;
  }
`;

const TextChoose = styled.p`
  color: var(--color-title);
  font-size: 1.4rem;
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
  padding: 0.6rem 1.6rem;
  border: 0.1rem solid var(--color-grey-200);
  border-radius: 0.8rem;
  background: transparent;
  outline: none;

  &:focus {
    border: 0.1rem solid var(--color-accent);
  }
`;

const InputContainer = styled.div`
  position: relative;
`;

const SaveButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;

  font-size: 1rem;
  background-color: var(--color-accent);
  border: 0.1rem solid var(--color-accent);
  border-radius: 0.8rem;
  color: var(--color-white);
  padding: 0 0.8rem;
  font-weight: 500;
`;

function AvatarUpdateModal({ isOpen, handleOpen }) {
  const [avatarUrl, setAvatarUrl] = useState('');

  const { updateAvatar, error: avatarError } = useUpdateAvatar();
  const { uploadAvatar } = useUploadUserAvatar();
  const {
    avatars,
    isLoading: isLoadingAvatars,
    error: getAvatarError,
  } = useGetAllAvatars();

  function handleAvatarUrl(e) {
    setAvatarUrl(e.target.value);
  }
  function handleChooseAvatar(url) {
    updateAvatar({ url: url });
    handleOpen(false);
  }

  function onSaveAvatarUrl() {
    updateAvatar({ url: avatarUrl });
    handleOpen(false);
  }

  function onAvatarUploadChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    uploadAvatar(file);
  }

  if (isLoadingAvatars) return <Spinner />;

  return (
    <Overlay>
      <StyledAvatarUpdateModal>
        <AvatarChangeContainer>
          <p onClick={() => handleOpen(false)}>close</p>
          <TextChoose>Put in a URL</TextChoose>
          <InputContainer>
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
          </InputContainer>
          <TextChoose>or upload an image</TextChoose>
          <input
            onChange={onAvatarUploadChange}
            type="file"
            name="avatar_image"
          />
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
        </AvatarChangeContainer>
      </StyledAvatarUpdateModal>
    </Overlay>
  );
}

export default AvatarUpdateModal;
