import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  const isWindowAvailable = typeof window !== 'undefined';
  const windowHeight = isWindowAvailable ? window.innerHeight : 0;
  const windowWidth = isWindowAvailable ? window.innerWidth : 0;
  const [screenSize, setScreenSize] = useState({
    windowWidth,
    windowHeight,
  });
  const isDesktop = screenSize.windowWidth >= 1365;

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        windowWidth,
        windowHeight,
      });
    };

    isWindowAvailable && window.addEventListener('resize', handleResize);

    return () => {
      isWindowAvailable && window.removeEventListener('resize', handleResize);
    };
  }, [isWindowAvailable, windowHeight, windowWidth]);

  return { ...screenSize, isDesktop };
};
