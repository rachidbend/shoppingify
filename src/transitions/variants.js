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

export const itemsParentContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.6,
      delay: 0.3,
      duration: 0.4,
      staggerChildren: 0.3,
    },
  },
};

export const itemsChildrenVariants = {
  hidden: { opacity: 0, x: 10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeIn' } },
};
