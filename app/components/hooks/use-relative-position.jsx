import React from 'react';

/**
 * Capture current mouse position under an element
 * @returns {state} current position relative to element
 */
// TODO: Finish custom hook
export default function useRelativePosition(currRef) {
  const [position, setPosition] = React.useState({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    function handlePosition(currRef) {
      setMousePosition({
        x: currRef.current.getBoundingClientRect().left,
        y: currRef.current.getBoundingClientRect().top,
      });
    }

    window.addEventListener('mousemove', handlePosition);

    return () => {
      window.removeEventListener('mousemove', handlePosition);
    };
  }, []);

  return position;
}

