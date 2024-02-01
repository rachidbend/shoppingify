import { motion } from 'framer-motion';
import styled from 'styled-components';

const StyledTopItemsOrCategories = styled.div`
  margin-bottom: 2.4rem;

  &:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 480px) {
    margin-bottom: 1.8rem;
  }
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.46rem;
`;
const Name = styled.p`
  color: var(--color-black);
  font-size: 1.4rem;
  font-weight: 500;
`;
const Percentage = styled.p`
  color: var(--color-black);
  font-size: 1.8rem;
  font-weight: 500;
`;

const TotalSlider = styled.div`
  position: relative;
  width: 100%;
  height: 0.6rem;
  border-radius: 0.4rem;
  background-color: var(--color-gray-600);
`;

const PercentageSlider = styled(motion.span)`
  height: 0.6rem;
  width: ${props => (props.percentage ? `${props.percentage}%` : '0%')};
  border-radius: 0.4rem;
  position: absolute;
  top: 0;

  left: 0;
  background-color: ${props =>
    props.backgroundcolor ? props.backgroundcolor : 'var(-color-black)'};
`;

function TopItemsOrCategories({ name, itemNumber, totalNumber, color }) {
  // console.log(name, itemNumber, totalNumber, color);
  return (
    <StyledTopItemsOrCategories>
      <TextContainer>
        <Name>{name}</Name>
        <Percentage>
          {((itemNumber / totalNumber) * 100).toFixed(0)}%
        </Percentage>
      </TextContainer>
      <TotalSlider>
        <PercentageSlider
          initial={{
            width: 0,
          }}
          animate={{
            width: `${((itemNumber / totalNumber) * 100).toFixed(0) * 2}%`,
          }}
          transition={{
            ease: 'anticipate',
            duration: 1,
            delay: 1,
          }}
          percentage={((itemNumber / totalNumber) * 100).toFixed(0) * 2}
          backgroundcolor={color}
        ></PercentageSlider>
      </TotalSlider>
    </StyledTopItemsOrCategories>
  );
}

export default TopItemsOrCategories;
