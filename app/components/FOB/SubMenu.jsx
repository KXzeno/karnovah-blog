import React from 'react';
import useClickListener from '@H/use-click-listener';

export default function SubMenu({ children, showSubMenu }) {
  let [isClicked, setIsClicked] = React.useState(false);
  let promptHook = useClickListener();

  // TODO: Unmount hook after clicked out from SubMenu
  React.useEffect(() => {
    if (showSubMenu) {
      promptHook;
    }

    if (promptHook === true) {
      setIsClicked((prev) => !prev);
    }

    return () => {
      promptHook = undefined;
    }
  }, [promptHook]);

  return (
    !!isClicked == false
    ? <>
      <div className="grid grid-cols-2 absolute bg-white text-black w-48 h-min max-h-80 top-16 justify-self-center inset-0 left-[4rem] text-center text-sm place-items-center rounded-[0.7rem] p-2">
        {children}
        <div className="absolute">
          <div className="z-2 bg-white h-4 w-4 origin-center rotate-45 rounded-tl-[0.1rem] -translate-y-[1.7rem] translate-x-[0.267rem]">
          </div>
        </div>
      </div>
    </>
    : undefined
  );
}
