"use client";
import React from 'react';
import Image from 'next/image';

export default function Home() {
  let [notice, setNotice] = React.useState("Ongoing Site Reconstruction");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setNotice(prevNotice => prevNotice === "Ongoing Site Reconstruction..."
        ? "Ongoing Site Reconstruction"
        : `${prevNotice}.`);
    }, 500);
    return () => clearTimeout(timer);
  }, [notice]);

  const id = React.useId();
  const userId = `${id}-username`;
  const passId = `${id}-password`;

  return(
    <>
      <div className="container min-w-full min-h-screen">
        <div className="flex flex-auto bg-black min-h-screen">
          <div className="place-self-center mx-auto animate-bounce hover:animate-spin">
            <p className="z-10 font-sono text-[2rem] max-sm:text-[1.1rem]">{notice}</p>
          </div>
        </div>
      </div>
    </>
  );
}
