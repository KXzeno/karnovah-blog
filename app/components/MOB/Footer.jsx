import React from 'react';

export default function Footer() {
  const currYear = new Date().getFullYear();

  return (
    <div className="flex flex-row basis-1/6 relative place-items-center h-32 bg-gradient-to-b from-violet-950 to-indigo-900 basis mt-[2.3rem]">
      <div className="order-0 size-full text-center py-2 text-[0.77rem]">
        <div className="flex size-full place-items-center">
          <p className="inline-block grow">Copyright <span className="text-[1rem] align-middle">©</span> {currYear} Karnovah </p>
        </div>
      </div> 
      <div className="grow-0 h-full bg-black bg-gradient-to-r from-violet-950 via-slate-950 to-violet-950 w-2">
      </div>
      <div className="size-full text-center pt-4">
        <div className="pb-2">
          Links
        </div>
        <div className="grid grid-rows-none grid-cols-2 mx-auto w-max">
          <p>1</p>
          <p>22</p>
          <p>333</p>
          <p>4444</p>
          <p>55555</p>
        </div>
      </div>
    </div>
  );
}
