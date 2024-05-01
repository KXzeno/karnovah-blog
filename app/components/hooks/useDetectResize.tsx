import React from 'react';

export default function useDetectResize(breakpoint: number = 768): object {
  // const h7 = Symbol.for('k');
  // const h9 = Symbol('f');
  // const h10 = Symbol.keyFor(h8);
  const width: symbol = Symbol.for('width');
  const breakpointCrossed: symbol = Symbol.for('breakpointCrossed');

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
    [width]: screenWidth, 
    [breakpointCrossed]: isWidth,
    // TODO: Give a generator function that handles array of breakpoints
    function() {
      console.log('test');
    }
  };
}
