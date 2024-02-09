import { createContext, useContext, useState } from 'react';

// Context for managing mobile side panel state
const MobileContext = createContext();

// Provider component for managing the state of the mobile side panel
export default function MobileSideProvider({ children }) {
  // State to manage whether the mobile side panel is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Determine if the device is mobile (phone or tablet)
  const isMobile = window.innerWidth <= 780;

  // Function to toggle the state of the mobile side panel
  function onOpenMobileSide() {
    // If the device is mobile, toggle the state; otherwise, set the state to open
    isMobile ? setIsOpen(isOpen => !isOpen) : setIsOpen(true);
  }

  function closeMobileSide() {
    isMobile && setIsOpen(false);
  }

  // Value provided by the context
  const contexValue = {
    isOpen,
    onOpenMobileSide,
    isMobile,
    closeMobileSide,
  };

  return (
    <MobileContext.Provider value={contexValue}>
      {children}
    </MobileContext.Provider>
  );
}

// Custom hook to easily access the mobile side panel context.
export function useMobileSide() {
  const value = useContext(MobileContext);
  // Throw an error if the hook is used outside of the MobileSideProvider
  if (value === undefined)
    throw new Error(
      'Mobile side context is used outside of the MobileSideProvider!'
    );

  return value;
}
