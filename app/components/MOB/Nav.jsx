"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import './MOB.css';
import useToggle from '@H/use-toggle';
import SubMenu from '@F/SubMenu';
import Link from 'next/link';
import { LayoutGroup, motion } from 'framer-motion';

export default function Nav() {
  const router = useRouter();
  let [dollarSigns, setDollarSigns] = React.useState([
    '$',
    '$',
    '$',
  ]);

  let [showSubMenu, toggleSubMenu] = useToggle(false);

  let id = React.useId(null);
  let [hoveredNavItem, setHoveredNavItem] = React.useState(null);

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

     <motion.div
      className="absolute inset-0 shadow-lg rounded-lg shadow-green-500/50"
      layoutId={id}
    />

  let LINKS = [
    {
      slug: 'recent',
      label: 'Recent',
      href: '/recent'
    },
    {
      slug: 'posts',
      label: 'Posts',
      href: '/posts'
    },
    {
      slug: 'about',
      label: 'About',
      href: '/about'
    }
  ];

  return (
    <>
      <nav id="nav-box" onMouseLeave={() => setHoveredNavItem(null)}>
        <LayoutGroup>
          { /* => { EXPRESSION = return manually } */ }
          {LINKS.map(({ slug, label, href }) => ( 
            <Link
              key={slug}
              href={href}
              onMouseOver={() => setHoveredNavItem(slug)}
              style={{
                zIndex: hoveredNavItem === slug ? 1 : 2,
              }}
              className="nav-btn"
            >
              {label}
              {hoveredNavItem === slug && (
                <motion.div
                  className="absolute inset-0 -mx-[0.31rem] shadow-lg rounded-xl shadow-green-500/50 shadow-[#A70AFF]"
                  layoutId={id}
                />
              )}
            </Link>
          ))}
          {/*
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
          */}
        </LayoutGroup>
        <div className={`${dollarSigns != 0 ? 'visible' : 'hidden'} absolute right-8 h-16 w-16`}>
          <LayoutGroup>
            <motion.button 
              whileHover={{ scale:1.7 }}
              whileTap={{ scale:0.9 }}
              className="absolute inset-0 text-center text-inherit"
              onClick={() => {
                setDollarSigns(dollarSigns.slice(1))
              }}
            >
              { dollarSigns }
            </motion.button>
          </LayoutGroup>
        </div>
      </nav>
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

