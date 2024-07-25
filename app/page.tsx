import React from 'react';
import Image from 'next/image';
import { Home } from './components';
import dynamic from 'next/dynamic';
let BuyMeACoffeeWidget = dynamic(() => import('@F/BuyMeACoffee')); 

export default function Blog() {

  return(
    <>
      <Home />
      <BuyMeACoffeeWidget />
    </>
  );
}
