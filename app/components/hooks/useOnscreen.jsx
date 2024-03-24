import React from 'react';

/**
 * Custom hook to observe element visibility on current viewport
 * @returns {state | ref} Destructurable variables for element visibility and reference
 */
export default function useOnscreen() { // Can instead use elementRef as prop and export only isOnscreen
  const [isOnscreen, setIsOnscreen] = React.useState(false);
  const elementRef = React.useRef();

  //TODO: Use rect to automate intersection of root/element
  React.useEffect(() => {
    let rect = elementRef.current.getBoundingClientRect();
    console.log(rect);

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsOnscreen(entry.isIntersecting);
    }, { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], rootMargin: `-${rect.height}px 100%` });
    observer.observe(elementRef.current);
    return () => {
      observer.disconnect();
    };
  }, [elementRef]);
  return [isOnscreen, elementRef]; // Using -{ }- disables destructuring
}

// export default function useOnscreen({ elementRef }) {
//   const [isOnscreen, setIsOnscreen] = React.useState(false);
// 
//   React.useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       const [entry] = entries;
//       setIsOnscreen(entry.isIntersecting);
//     });
//     observer.observe(elementRef.current);
//     return () => {
//       observer.disconnect();
//     };
//   }, [elementRef]);
//   return isOnscreen; 
// }
