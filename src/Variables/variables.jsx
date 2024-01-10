export const routeVariants = {
  initial: {
    opacity: 0,
    y: '20vh',
  },
  final: {
    opacity: 1,
    y: '0vh',
    transition: {
      type: 'spring',
      mass: 0.2,
      duration: 1,
      delay: 0.1,
    },
  },
};

export const childrenVariants = {
  initial: {
    opacity: 0,
    y: '30px',
  },
  final: {
    opacity: 1,
    y: '0px',
    transition: {
      duration: 0.5,
      delay: 0.2,
    },
  },
};

const styled = { createGlobalStyle };

export const GlobalStyle = styled.createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`;
