/* eslint-disable react/prop-types */
import { MdArrowRightAlt } from 'react-icons/md';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const StyledBackButton = styled.button`
  background: none;
  border: none;
  color: var(--color-accent);
  font-size: 1.4rem;
  font-weight: 700;

  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;

  margin-top: ${props => (props.margintop ? props.margintop : '0')};
  margin-bottom: ${props => (props.marginbottom ? props.marginbottom : '0')};
`;

const ArrowIcon = styled(MdArrowRightAlt)`
  width: 2.4rem;
  height: 2.4rem;
  transform: rotate(180deg);
`;

function BackButton({ marginTop = '2.48rem', marginBottom = '3.11rem' }) {
  const navigate = useNavigate();

  return (
    <StyledBackButton
      margintop={marginTop}
      marginbottom={marginBottom}
      onClick={() => navigate(-1)}
    >
      <ArrowIcon /> back
    </StyledBackButton>
  );
}

export default BackButton;
