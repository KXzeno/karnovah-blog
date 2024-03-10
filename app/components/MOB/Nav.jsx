import React from 'react';
import { useRouter } from 'next/navigation';
import './MOB.css';
import useToggle from '@H/use-toggle';
import SubMenu from '@F/SubMenu';

export default function Nav() {
  const router = useRouter();
  //TODO:
  // 1. Decide creation of dollarSigns on render instead of conditional display
  // 2. Design pattern for recent posts
  let [dollarSigns, setDollarSigns] = React.useState([
    '$',
    '$',
    '$',
  ]);

  let [showSubMenu, toggleSubMenu] = useToggle(false);

  // const subMenuRef = React.useRef();

  let handleRoute = (e) => {
    let { target: { outerText: value } } = e;
    // return value !== '▼' && router.push(`${value.toLowerCase()}`)
    return value === '▼' ? toggleSubMenu() : router.push(`${value.toLowerCase()}`);
  }

  return (
    <>
      <div id="nav-box">
        <button type="button" onClick={handleRoute} className="nav-btn">
          Recent
        </button>
        <button 
          type="button" 
          onClick={handleRoute} 
          className="relative nav-btn-posts">
          <p className="nav-btn inline">
            Posts
          </p>
          <span 
            dir="rtl"
            // ref={subMenuRef}
            id="sub-menu"
          >
            ▼
          </span>
        </button>
        <button type="button" onClick={handleRoute} className="nav-btn">
          About
        </button>
        <div className={`${dollarSigns != 0 ? 'visible' : 'hidden'} absolute right-8 h-16 w-16`}>
          <button 
            className="absolute inset-0 text-center text-inherit"
            onClick={(event) => {
              setDollarSigns(dollarSigns.slice(1))
            }}
          >
            { dollarSigns }
          </button>
        </div>
      </div>
      { showSubMenu && 
      <SubMenu>
          <p>Test</p>
          <p>Test</p>
          <p>Test</p>
          <p>Test</p>
      </SubMenu>
      }
    </>
  );
}
