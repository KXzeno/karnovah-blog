import React from 'react';

const widthSymbol: symbol = Symbol.for('width');
const breakpointCrossedSymbol: symbol = Symbol.for('breakpointCrossed');

type SymboledObject = {
  [key in typeof widthSymbol | typeof breakpointCrossedSymbol]: number | boolean;
}

export default function useDetectResize(breakpoint: number = 768): SymboledObject {
  // const h7 = Symbol.for('k');
  // const h9 = Symbol('f');
  // const h10 = Symbol.keyFor(h8);

  let defaultWidth: number = 0;
  if (typeof window !== 'undefined') {
    defaultWidth = window.innerWidth;
  };

  // Represents current screen width
  let [screenWidth, setScreenWidth] = React.useState<number>(defaultWidth);

  // Custom breakpoint variable using 'screenWidth' state
  let isWidth: boolean = screenWidth <= breakpoint;

  function handleWidthResize(): void {
    setScreenWidth(window.innerWidth);
  }

  React.useEffect(() => {
    typeof window !== 'undefined' 
    && window.addEventListener('resize', handleWidthResize)

    return () => {
      window.removeEventListener('resize', handleWidthResize)
    };
  }, []);

  return {
    [widthSymbol]: screenWidth,
    [breakpointCrossedSymbol]: isWidth,
  };
}
