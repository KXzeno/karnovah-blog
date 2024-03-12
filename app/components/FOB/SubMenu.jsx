import React from 'react';
import useClickListener from '@H/use-click-listener';

export default React.forwardRef(function SubMenu({ 
  children, 
  showSubMenu, 
  toggleSubMenu, 
  ...delegated
}, subMenuRef) {
  let [checkChange, setCheckChange] = React.useState(1);

  function toggleEnter(e) {
    setCheckChange((prev) => prev + 1);
  }

  function toggleLeave(e) {
    if (e.target === subMenuRef.current.firstChild) {
      return;
    }

    if (isMobile) {
      toggleSubMenu();
    }

    setCheckChange(0);
  }

  let [pointer, setPointer] = useClickListener();

  let [width, setWidth] = React.useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  let isMobile = width <= 768;

  React.useEffect(() => {
    console.log(showSubMenu, pointer);

    if (!isMobile) {
      subMenuRef.current.addEventListener('pointermove', toggleEnter);
      subMenuRef.current.addEventListener('pointerleave', toggleLeave);

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
        subMenuRef.current?.removeEventListener('pointermove', toggleEnter);
        subMenuRef.current?.removeEventListener('pointerleave', toggleLeave);
      }
    }

    if (isMobile) {
      // showSubMenu === true && isMobile && checkChange !== 0
      subMenuRef.current.addEventListener('touchend', toggleEnter);
      window.addEventListener('touchend', toggleLeave);

      showSubMenu === true && checkChange !== 0
        ? setCheckChange(1)
        : toggleSubMenu();

      return () => {
        subMenuRef.current?.removeEventListener('touchend', toggleEnter);
        window.removeEventListener('touchend', toggleLeave);
      }
    }

  }, [pointer, showSubMenu, toggleSubMenu]);

  return (
    <div ref={subMenuRef} className="pointer-events-auto z-10">
      <div className="grid grid-cols-2 absolute bg-white text-black w-48 h-min max-h-80 top-16 justify-self-center inset-0 left-[4rem] text-center text-sm place-items-center rounded-[0.7rem] p-2">
        {children}
        {checkChange}
        <div className="absolute">
          <div className="z-2 bg-white h-4 w-4 origin-center rotate-45 rounded-tl-[0.1rem] -translate-y-[1.7rem] translate-x-[0.267rem]">
          </div>
        </div>
      </div>
    </div>
  );
})
