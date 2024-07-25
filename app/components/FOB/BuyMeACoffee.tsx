'use client';
import React from 'react';
import Script from 'next/script';

export default function BuyMeACoffeeWidget() {

  return (
    <Script
      src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
      data-name="BMC-Widget"
      data-cfasync="false"
      data-id="kaszworkx"
      data-description="Support me on Buy me a coffee!"
      data-message=""
      data-color="#5F7FFF"
      data-position="Right"
      data-x_margin="18"
      data-y_margin="18"
      strategy="afterInteractive"
      onLoad={() => {
        // console.log(((evt as React.BaseSyntheticEvent).target as HTMLScriptElement));
        let e = document.createEvent('Event');
        e.initEvent('DOMContentLoaded');
        window.dispatchEvent(e);
      }}
    />
  )
}

