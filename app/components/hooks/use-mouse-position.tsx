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

  type TargetEvent = React.MouseEvent<Window>

  React.useEffect(() => {
    function handleMouseMove(event: TargetEvent | Event): void {
       setMousePosition({
        x: (event as TargetEvent).clientX,
        y: (event as TargetEvent).clientY,
      });
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return mousePosition;
}
