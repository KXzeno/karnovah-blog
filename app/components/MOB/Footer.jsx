import React from 'react';

export default function Footer() {
  const currYear = new Date().getFullYear();

  return (
    <div className="absolute inset-x-0 bottom-0 min-w-max h-min">
      <div className="text-center bg-violet-950 py-2 text-[0.77rem]">
        <p>Copyright <span className="text-[1rem] align-middle">©</span> {currYear} Karnovah </p>
      </div>
    </div>
  );
}
