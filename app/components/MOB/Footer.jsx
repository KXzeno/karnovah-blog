import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currYear = new Date().toLocaleString('en-US', { year: 'numeric' });

  return (
    <footer className="flex flex-row basis-1/6 relative place-items-center h-32 bg-gradient-to-b from-violet-950 to-indigo-900 basis mt-[2.3rem] text-[#3f7300]">
      <div className="order-0 size-full text-center py-2 text-[0.77rem]">
        <div className="flex size-full place-items-center">
          <p className="inline-block grow">Copyright <span className="text-[1rem] align-middle">©</span> {currYear} Karnovah </p>
        </div>
      </div> 
      <div className="grow-0 h-full bg-black bg-gradient-to-r from-violet-950 via-slate-950 to-violet-950 w-2">
      </div>
      <nav className="size-full text-center pt-4">
        <div className="pb-2 underline text-[.83rem]">
          Links
        </div>
        <div className="grid grid-rows-none grid-cols-3 gap-x-4 gap-y-2 mx-auto w-max text-[0.77rem]">
          <Link className="col-span-3 hover:text-[#69c000]" href="https://karnovah.com">Apex Domain</Link>
          <Link className="hover:text-[#69c000]" href="https://github.com/KXzeno">Github</Link>
          <Link className="hover:text-[#69c000]" href="mailto:karnovah@outlook.com">Contact</Link>
          <Link className="hover:text-[#69c000]" href="https://discord.gg/5t77NmRYS8">Discord</Link>
        </div>
      </nav>
    </footer>
  );
}
