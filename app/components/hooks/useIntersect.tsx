'use client';
import React from 'react';

export default function useIntersect(elementA: HTMLElement | null, elementB: HTMLElement | null): boolean | void {
  // Vertical downward collapse,
  // TODO: Handle all intersections
  let [intersected, setIntersected] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!(elementA !== null && elementB !== null)) {
      return;
    }
    let rectA = elementA.getBoundingClientRect();
    let rectB = elementB.getBoundingClientRect();

    setIntersected(rectB.bottom < rectA.bottom);
  }, [elementA, elementB]);

  return intersected;
}
