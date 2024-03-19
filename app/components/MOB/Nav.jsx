"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import './MOB.css';
import useToggle from '@H/use-toggle';
import SubMenu from '@F/SubMenu';
import Link from 'next/link';

export default function Nav() {
  const router = useRouter();
  let [dollarSigns, setDollarSigns] = React.useState([
    '$',
    '$',
    '$',
  ]);

  let [showSubMenu, toggleSubMenu] = useToggle(false);

  /**
   * Manual routers which otherwise toggles a sub menu
   * @param {object} e - event to access innerHTML or 'outerText'
   * @returns {function} Either triggers a toggler or reroute function
   * @author Kx
   */
  let handleRoute = (e) => {
    let { target: { outerText: value } } = e;
    return value === '▼' ? toggleSubMenu() : router.push(`${value.toLowerCase()}`);
  }

  /**
   * Prevent default event responses
   * @param {object} e - event triggered
   * @returns {function} method to prevent default revent responses
   * @author Kx
   */  
  let handleDefault = (e) => e.preventDefault();

  let subMenuRef = React.useRef(null);

  return (
    <>
      <div id="nav-box">
        <Link href="/recent" onClick={handleRoute} className="nav-btn">
          Recent
        </Link>
        <Link 
          href="/posts"
          type="button" 
          onClick={handleRoute} 
          className="relative nav-btn-posts pointer-events-auto">
          <p className="nav-btn inline">
            Posts
          </p>
          <span 
            onClick={handleDefault}
            dir="rtl"
            id="sub-menu"
          >
            ▼
          </span>
        </Link>
        <Link href="/about" type="button" onClick={handleRoute} className="nav-btn">
          About
        </Link>
        <div className={`${dollarSigns != 0 ? 'visible' : 'hidden'} absolute right-8 h-16 w-16`}>
          <button 
            className="absolute inset-0 text-center text-inherit"
            onClick={() => {
              setDollarSigns(dollarSigns.slice(1))
            }}
          >
            { dollarSigns }
          </button>
        </div>
      </div>
      { showSubMenu && 
      <SubMenu showSubMenu={showSubMenu} toggleSubMenu={toggleSubMenu} ref={subMenuRef}>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
      </SubMenu>
      }
    </>
  );
}

