import { createContext, useContext, useState } from 'react';

// mobile context
const MobileContext = createContext();

export default function MobileSideProvider({ children }) {
  // stores the state of when the sidepage should be displayed ro not (for use in mobile view)
  const [isOpen, setIsOpen] = useState(false);

  // this checks if the device used is a mobile device (phone or tablet)
  const isMobile = window.innerWidth <= 780;
  // this function allows a component to change the state
  function onOpenMobileSide() {
    isMobile ? setIsOpen(isOpen => !isOpen) : setIsOpen(true);
  }

  return (
    <MobileContext.Provider value={{ isOpen, onOpenMobileSide, isMobile }}>
      {children}
    </MobileContext.Provider>
  );
}

// custom hook to easily get the values needed
export function useMobileSide() {
  const value = useContext(MobileContext);

  if (value === undefined)
    throw new Error(
      'Mobile side context is used outside of the MobileSideProvider!'
    );

  return value;
}
