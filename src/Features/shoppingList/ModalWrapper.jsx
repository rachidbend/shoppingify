import { AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

export default function ModalWrapper({ children, isShowing }) {
  return createPortal(
    <AnimatePresence>{isShowing && children}</AnimatePresence>,
    document.body
  );
}
