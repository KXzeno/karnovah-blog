import React from 'react';
import useClickListener from '@H/use-click-listener';

export default function SubMenu({ children, showSubMenu, toggleSubMenu }) {

  let clickListener = useClickListener();
  React.useEffect(() => {
    if (showSubMenu === true && clickListener === true) {
      toggleSubMenu();
    }
    console.log(showSubMenu, clickListener);
  }, [clickListener, showSubMenu, toggleSubMenu]);

  return (
    <div>
      <div className="grid grid-cols-2 absolute bg-white text-black w-48 h-min max-h-80 top-16 justify-self-center inset-0 left-[4rem] text-center text-sm place-items-center rounded-[0.7rem] p-2">
        {children}
        <div className="absolute">
          <div className="z-2 bg-white h-4 w-4 origin-center rotate-45 rounded-tl-[0.1rem] -translate-y-[1.7rem] translate-x-[0.267rem]">
          </div>
        </div>
      </div>
    </div>
  );
}
