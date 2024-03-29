import React from 'react';

export default function useDetectResize(breakpoint = 768) {
  // const h7 = Symbol.for('k');
  // const h9 = Symbol('f');
  // const h10 = Symbol.keyFor(h8);
  const width = Symbol.for('width');
  const breakpointCrossed = Symbol.for('breakpointCrossed');

  // Represents current screen width
  let [screenWidth, setScreenWidth] = React.useState(() => !!window && window.innerWidth);

  if (window !== 'undefined') {
    // Custom breakpoint variable using 'screenWidth' state
    let isWidth = screenWidth <= breakpoint;

    function handleWidthResize() {
      setScreenWidth(window.innerWidth);
    }
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
