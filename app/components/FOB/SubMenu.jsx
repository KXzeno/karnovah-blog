import React from 'react';
import useClickListener from '@H/use-click-listener';

export default React.forwardRef(function SubMenu({ 
  children, 
  showSubMenu, 
  toggleSubMenu, 
  ...delegated
}, subMenuRef) {
  let [checkChange, setCheckChange] = React.useState(1);

  function toggleEnter() {
    setCheckChange((prev) => prev + 1);
  }

  function toggleLeave() {
    setCheckChange(0);
  }

  let [pointer, setPointer] = useClickListener();

  React.useEffect(() => {
    subMenuRef.current.addEventListener('pointermove', toggleEnter)
    subMenuRef.current.addEventListener('pointerleave', toggleLeave)
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
      removeEventListener('pointermove', toggleEnter);
      removeEventListener('pointerleave', toggleLeave);
    }
    console.log(showSubMenu, !!subMenuRef.current);
  }, [pointer, showSubMenu, toggleSubMenu]);

  return (
    <div ref={subMenuRef} className="pointer-events-auto">
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
