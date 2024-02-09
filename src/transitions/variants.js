export const navHoverVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  transition: {
    ease: 'easeInOut',
    duration: 0.3,
  },
};

export const mainPagesVariants = {
  hidden: {
    opacity: 0,
  },
  visible: { opacity: 1 },

  transition: {
    type: 'tween',
    ease: 'easeInOut',
    duration: 1,
  },
};

export const mainPagesChildrenVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
  transition: {
    type: 'tween',
    duration: 0.6,
    delay: 0.2,
  },
};
