"use client";

import React, {Dispatch, SetStateAction} from 'react';
import { useRouter } from 'next/navigation';
import './MOB.css';
import useToggle from '@H/use-toggle';
import SubMenu from '@F/SubMenu';
import Link from 'next/link';
import { LayoutGroup, motion } from 'framer-motion';

export default function Nav() {
  const router = useRouter();

  let [endpointAccessed, setEndpointAccessed] = React.useState<number>(1);

  // Left-hand annotation is redundant if typing by generics
  let [dollarSigns, setDollarSigns]: [string[] | string, Dispatch<SetStateAction<string[]>>] = React.useState<string[]>([
    '$',
    '$',
    '$',
  ]);

  let [showSubMenu, toggleSubMenu]: [boolean, Function] = useToggle(false);

  let id: string = React.useId();
  let [hoveredNavItem, setHoveredNavItem]: [string | undefined, Function] = React.useState(undefined);

  /** Optional use
   * Manual routers which otherwise toggles a sub menu
   * @param {object} e - event to access innerHTML or 'outerText'
   * @returns {function} Either triggers a toggler or reroute function
   * @author Kx
   */
  let handleRoute: Function = (e: Event) => {
    let [target, value]: [HTMLElement, Function | string | undefined] = [e.target as HTMLElement, undefined];
    if (target && target.outerText) {
      let { outerText: value } = target;
    }
    /** @deprecated
     * if (value) {
     *   return value === '▼' ? toggleSubMenu() : router.push(`${(value as string).toLowerCase()}`);
     * }
     */
  }

  /**
   * @deprecated
   *
   * Prevent default event responses
   * @param {object} e - event triggered
   * @returns {function} method to prevent default revent responses
   * @author Kx
   */  
  let handleDefault: Function = (e: Event) => e.preventDefault();

  let subMenuRef = React.useRef(null);

  let LINKS = [
    {
      slug: 'choice',
      label: 'Choice',
      href: '/choice'
    },
    {
      slug: 'categories',
      label: 'Categories',
      href: '/categories'
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
              onClick={(e) => {
                if (slug === 'choice') {
                  e.preventDefault();
                  setEndpointAccessed(prev => prev ^ 1);
                  endpointAccessed === 1 ?
                    router.replace(`/?choice=${endpointAccessed}`, { scroll: false }) :
                    router.replace(`/`);
                } else {
                  setEndpointAccessed(1);
                }
              }}
              style={{
                zIndex: hoveredNavItem === slug ? 1 : 2,
              }}
              className="nav-btn"
            >
              {label}
              {hoveredNavItem === slug && (
                <div className='flex flex-row w-full justify-center -translate-y-[0.2rem]'>
                  <motion.div 
                    // FIXME: Loses original location when transferring motion to other navitem with -translate-y-[...]
                    // TODO: Reduce framer-motion reliance; use vanilla keyframes and animations
                    className='absolute w-2 border-[#FF204E] border-t-2' 
                    initial={{ width: '0' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                    layoutId={id}
                  />
                </div>
              )}
            </Link>
                                                ))}
        </LayoutGroup>
        <div className={`${dollarSigns.length !== 0 ? 'visible' : 'hidden'} absolute right-8 h-16 w-16 text-inherit`}>
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

