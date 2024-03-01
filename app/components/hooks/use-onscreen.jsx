import React from 'react';

/**
 * Custom hook to observe element visibility on current viewport
 * @returns {state | ref} Destructurable variables for element visibility and reference
 */
export default function useIsOnscreen() { // Can instead use elementRef as prop and export only isOnscreen
  const [isOnscreen, setIsOnscreen] = React.useState(false);
  const elementRef = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsOnscreen(entry.isIntersecting);
    });
    observer.observe(elementRef.current);
    return () => {
      observer.disconnect();
    };
  }, [elementRef]);
  return [isOnscreen, elementRef]; // Using -{ }- disables destructuring
}
