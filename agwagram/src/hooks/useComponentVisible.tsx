import { useState, useEffect, useCallback,useRef } from "react";

interface ComponentVisibleProps {
    ref: React.MutableRefObject<any>;
    isComponentVisible: boolean;
    setIsComponentVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

// From https://stackoverflow.com/a/45323523
export default function useComponentVisible(initialIsVisible: boolean): ComponentVisibleProps {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef<any>(null);
  
    const handleClickOutside = useCallback((event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsComponentVisible(false);
      }
    }, [setIsComponentVisible]);
  
    const handleEscapeKeyDown = useCallback((event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsComponentVisible(false);
      }
    }, [setIsComponentVisible]);
  
    useEffect(() => {
      document.addEventListener('click', handleClickOutside, true);
      document.addEventListener('keydown', handleEscapeKeyDown, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
        document.removeEventListener('keydown', handleEscapeKeyDown, true);
      };
    }, [handleClickOutside, handleEscapeKeyDown]);
  
    return { ref, isComponentVisible, setIsComponentVisible };
}