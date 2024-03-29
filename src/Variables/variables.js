export const routeVariants = {
  initial: {
    opacity: 0,
    y: '30px',
  },
  final: {
    opacity: 1,
    y: '0px',
    transition: {
      type: 'linear',
      mass: 0.4,
      duration: 0.8,
      delay: 0.2,
    },
  },
};

export const shoppingListVariants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  final: {
    opacity: 1,
    x: '0',
    transition: {
      duration: 0.8,
      delay: 0.2,
    },
  },

  exit: {
    opacity: 0,
    x: 20,
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
      staggerChildren: 0.5,
    },
  },
};

export const listChildrenVariants = {
  initial: {
    opacity: 0,
  },
  final: {
    opacity: 1,

    transition: {
      duration: 0.6,
      delay: 0.4,
    },
  },
};

export const itemVariantes = {
  initial: {
    opacity: 0,
    y: '1rem',
  },
  final: {
    opacity: 1,
    y: '0rem',

    transition: {
      duration: 0.6,
      delay: 0.2,
    },
  },
};
