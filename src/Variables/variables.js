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
      duration: 0.6,
      delay: 0.2,
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
      duration: 0.6,
      delay: 0.4,
    },
  },
};

export const listChildrenVariants = {
  initial: {
    opacity: 0,
    x: '30px',
  },
  final: {
    opacity: 1,
    x: '0px',
    transition: {
      duration: 0.6,
      delay: 0.4,
    },
  },
};
