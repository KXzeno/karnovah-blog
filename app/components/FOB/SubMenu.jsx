import React from 'react';

export default function SubMenu({ children }) {
  return (
    <>
      <div className="grid grid-cols-2 absolute bg-white text-black w-48 h-64 top-16 justify-self-center inset-0 left-[4rem] text-center text-sm place-items-center rounded-[0.7rem]">
        {children}
        <div className="absolute">
          <div className="z-1 bg-white h-4 w-4 origin-center rotate-45 rounded-tl-[0.1rem] -translate-y-[7.9rem] translate-x-[0.267rem]">
          </div>
        </div>
      </div>
    </>
  );
}
