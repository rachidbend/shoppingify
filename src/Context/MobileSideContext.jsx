import { createContext, useContext, useState } from 'react';

const MobileContext = createContext();

export default function MobileSideProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  function onOpenMobileSide() {
    setIsOpen(isOpen => !isOpen);
  }

  return (
    <MobileContext.Provider value={{ isOpen, onOpenMobileSide }}>
      {children}
    </MobileContext.Provider>
  );
}

export function useMobileSide() {
  const value = useContext(MobileContext);

  if (value === undefined)
    throw new Error(
      'Mobile side context is used outside of the MobileSideProvider!'
    );

  return value;
}
