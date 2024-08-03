'use client';
import React from 'react';

export default function useIntersect(elementA: HTMLElement | null, elementB: HTMLElement | null): boolean | void {
  if (!(elementA !== null && elementB !== null)) {
    return;
  }

  // Vertical downward collapse,
  // TODO: Handle all intersections
  let [intersected, setIntersected] = React.useState<boolean>(false);

  let rectA = elementA.getBoundingClientRect();
  let rectB = elementB.getBoundingClientRect();

  React.useEffect(() => {
    if (rectB.bottom < rectA.bottom) {
      setIntersected(true);
    } else if (rectB.bottom > rectA.bottom) {
      setIntersected(false);
    }
  });

  let memoizedIntersected = React.useMemo(() => intersected, [intersected]);

  return memoizedIntersected;
}
