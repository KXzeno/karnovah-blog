"use client";
import React from 'react';
import Image from 'next/image';
import { Home } from './components';

export default function Blog() {
  const id = React.useId();
  const userId = `${id}-username`;
  const passId = `${id}-password`;

  return(
    <>
      <Home />
      <div className="mt-[400rem] text-center">
        Inserted for scroll testing
      </div>
    </>
  );
}
