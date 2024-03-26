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
    let [rect, sib] = 
      [elementRef.current.getBoundingClientRect(), 
      elementRef.current.nextElementSibling];

    let sibTag = sib ? sib.tagName : null;
    let sibRect = sibTag !== null ? sib.getBoundingClientRect() : 0;

    let totalHeight = sibRect !== 0 
      ? rect.height + sibRect.height
      : rect.height


//    let xHeight = (sibTag === 'SECTION')
 //     ? sib

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsOnscreen(entry.isIntersecting);
      // console.log(entry.rootBounds, entry.boundingClientRect)
    }, { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], rootMargin: `${0}px 0px` });
    let nextElement = (sib && sib.tagName === 'SECTION') 
      ? sib : elementRef.current;

    console.log(nextElement);
    observer.observe(nextElement);
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
