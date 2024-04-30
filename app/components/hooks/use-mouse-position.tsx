import React from 'react';

/**
 * Capture current mouse position under an element
 * @returns {state} current mouse position
 */
export default function useMousePosition(): object {
  const [mousePosition, setMousePosition] = React.useState<object>({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    function handleMouseMove(event: React.MouseEvent) {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return mousePosition;
}
