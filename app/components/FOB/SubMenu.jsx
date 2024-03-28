import React from 'react';
import useClickListener from '@H/use-click-listener';

/**
 * Self-serving sub menu component
 * @param {<>} children - HTML to be extraneously inputted
 * @param {boolean} showSubMenu - represents truthiness on DOM node existence
 * @param {function} toggleSubMenu - setter function for showSubMenu
 * @param {object} delegated - Delegated props
 * @returns {HTML} DOM node representing sub menu
 * @author Kx
 */
export default React.forwardRef(function SubMenu({ 
  children, 
  showSubMenu, 
  toggleSubMenu, 
  ...delegated
}, subMenuRef) {
  /**
   * Represents condition for toggle state
   * State behaving as either > 0 or === 0
   * Defaults to '1' to avoid premature resolution
   */
  let [checkChange, setCheckChange] = React.useState(1);

  // Represents custom hook that fires a click event listener
  let [pointer, setPointer] = useClickListener();

  // Represents current screen width
  let [width, setWidth] = React.useState(window.innerWidth);

  // Custom breakpoint variable using 'width' state
  let isMobile = width <= 768;

  /**
   * Callback event handler to retain SubMenu state
   * @returns {function} perennially sets checkChange
   * @author Kx
   */
  function toggleEnter() {
    setCheckChange((prev) => prev + 1);
  }

  /**
   * Callback event handler to remove SubMenu toggle state
   * @param {object} e - event used for comparison
   * @returns {} Optionally resolves to N/A when state reaches SubMenu
   * @return {function} Optionally remove SubMenu toggle state if on mobile
   * @return {function} Sets checkChange to 0
   * @author Kx
   */
  let toggleLeave = React.useCallback((e) => {
    if (e.target === subMenuRef.current.firstChild) {
      return;
    };

    if (isMobile) {
      toggleSubMenu();
    }

    setCheckChange(0);
  }, [isMobile, toggleSubMenu, subMenuRef]);

    /**
     * Callback event handler to read current window size
     * @returns {function} 'width' setter function
     * @author Kx
     */
    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }

    /**
     * Onmount hook to identify window size
     * @param {function} () - Handles resize events and updates 'width'
     * @author Kx
     */
    React.useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
      }
    }, []);

  /**
   * Hook to conditionally display SubMenu
   * @param {function} () - Conditionally applies specific event handlers based on breakpoint
   * @author Kx
   */
  React.useEffect(() => {
    if (!isMobile) {
      let smRef = subMenuRef.current;
      smRef.addEventListener('pointermove', toggleEnter);
      smRef.addEventListener('pointerleave', toggleLeave);

      showSubMenu === true && pointer === true && checkChange !== 0
        ? +(() => {
          setPointer(false);
          return;
        })()
        : +(() => {
          if (checkChange === 0 && pointer === true && showSubMenu === true) {
            toggleSubMenu();
          }
        })();
      return () => {
        smRef?.removeEventListener('pointermove', toggleEnter);
        smRef?.removeEventListener('pointerleave', toggleLeave);
      }
    }

    if (isMobile) {
      // showSubMenu === true && isMobile && checkChange !== 0
      let smRef = subMenuRef.current;
      smRef.addEventListener('touchend', toggleEnter);
      window.addEventListener('touchend', toggleLeave);

      showSubMenu === true && checkChange !== 0
        ? setCheckChange(1)
        : toggleSubMenu();

      return () => {
        smRef?.removeEventListener('touchend', toggleEnter);
        window.removeEventListener('touchend', toggleLeave);
      }
    }

  }, [pointer, showSubMenu, toggleSubMenu, setPointer, subMenuRef, toggleLeave, checkChange, isMobile]);

  return (
    <div className="min-w-full absolute">
      <div ref={subMenuRef} className="pointer-events-auto w-16 h-16 mx-auto">
        <nav className="grid grid-cols-2 mx-auto absolute bg-white text-black w-48 h-min max-h-80 top-16 justify-self-center inset-0 left-[4rem] text-center text-sm place-items-center rounded-[0.7rem] p-2 -translate-y-[5.3rem] z-[1]">
          {children}
        </nav>
      </div>
      <div className="grid grid-cols-1 justify-items-center">
        <div className="z-10 bg-white h-4 w-4 origin-center rotate-45 rounded-tl-[0.1rem] -translate-y-[5.7rem] translate-x-[2.23rem]">
        </div>
      </div>
    </div>
  );
})
