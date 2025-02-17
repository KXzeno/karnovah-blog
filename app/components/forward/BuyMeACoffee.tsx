'use client';
import React from 'react';
import Script from 'next/script';

export default function BuyMeACoffeeWidget() {
  let [bmcBtn, setBmcBtn] = React.useState<HTMLDivElement | null>(null);
  let [bmcBtnWidth, setBmcBtnWidth] = React.useState<string>('');
  let [bmcImgWidth, setBmcImgWidth] = React.useState<string>('');

  let bmcImgEvent = (e: MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'IMG') {
      return;
    }
    if (bmcBtn === null || bmcBtn.firstChild === null) {
      return;
    }

    let bmcImg = bmcBtn.firstElementChild as HTMLImageElement;

    bmcImg.style.width = bmcImg.style.height = bmcImgWidth;
    bmcBtn.removeEventListener('click', bmcBtnEvent);
    window.removeEventListener('click', bmcImgEvent);
    bmcBtn.addEventListener('click', bmcBtnEvent);
  }

  let bmcBtnEvent = () => {
    if (bmcBtn === null) {
      return;
    }
    window.addEventListener('click', bmcImgEvent)
  }

  React.useEffect(() => {
    if (bmcBtn !== null) {
      bmcBtn.addEventListener('click', bmcBtnEvent);
    }

    return () => {
      if (bmcBtn !== null) {
        bmcBtn.removeEventListener('click', bmcBtnEvent);
        window.removeEventListener('click', bmcImgEvent);
      }
    }
  }, [bmcBtn]);

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
      strategy="lazyOnload"
      onLoad={() => {
        // console.log(((evt as React.BaseSyntheticEvent).target as HTMLScriptElement));
        let e: Event = new Event('DOMContentLoaded');
        window.dispatchEvent(e);
        let btn: HTMLDivElement | null = document.getElementById('bmc-wbtn') as HTMLDivElement;
        setBmcBtn(btn);
        if (btn === null) {
          return;
        }
        let newBtnWidth: string = `${Number.parseInt(btn.style.width.replace(/[\D]+/, '')) / 2}px`;
        setBmcBtnWidth(newBtnWidth);
        btn.style.width = btn.style.height = newBtnWidth;

        let img: HTMLImageElement | null = btn.firstElementChild as HTMLImageElement; 

        if (img === null) {
          return;
        }

        let newImgWidth: string = `${Number.parseInt(newBtnWidth.replace(/[\D]+/, '')) * 0.5625}px`
        setBmcImgWidth(newImgWidth);
        img.style.width = img.style.height = newImgWidth;
      }}
    />
  )
}

