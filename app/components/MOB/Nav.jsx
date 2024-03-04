import React from 'react';
import { useRouter } from 'next/navigation';
import './MOB.css';

export default function Nav() {
  const router = useRouter();
  let [dollarSigns, setDollarSigns] = React.useState([
    '$',
    '$',
    '$',
  ]);

  return (
    <div id="nav-box" className="bg-[#18122B]">
      <button type="button" onClick={() => router.push('/recent')}>
        Recent
      </button>
      <button type="button" onClick={() => router.push('/posts')}>
        Posts<span className="text-[0.7rem] ml-[0.1rem]">▼</span>
      </button>
      <button type="button" onClick={() => router.push('/about')}>
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
  );
}
