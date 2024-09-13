import { useEffect, useState } from 'react';

export function useLg(): boolean {
  const [isLg, setIsLg] = useState<boolean>(true);

  useEffect(() => {
    // Define the media query
    const mediaQuery: MediaQueryList = window.matchMedia('(min-width: 1024px)');

    // Function to handle the media query change
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsLg(e.matches);
    };

    // Check the media query state on the first load
    setIsLg(mediaQuery.matches);

    // Add the event listener for subsequent changes
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Cleanup function to remove the event listener
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return isLg;
}
