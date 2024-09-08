import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

export function useScrollDown(value = 150) {
  const [isScrollDown, setIsScrollDown] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latestValue) => {
    const previousValue = scrollY.getPrevious();
    if (previousValue && latestValue > previousValue && latestValue > value) {
      setIsScrollDown(true);
    } else {
      setIsScrollDown(false);
    }
  });

  return isScrollDown;
}
