import React from 'react';
import Link from 'next/link';

export default function Footer(): React.ReactNode {
  const currYear: string = new Date().toLocaleString('en-US', { year: 'numeric' });

  return (
    <footer className="footer-ctr">
      <div className="footer-first-cell">
        <div className="copyright">
          <p className="cr-text">Copyright <span>©</span> {currYear} Karnovah </p>
        </div>
      </div> 
      <div className="kstm-border">
      </div>
      <nav className="footer-second-cell">
        <div>
          Links
        </div>
        <div>
          <Link href="https://karnovah.com">Apex Domain</Link>
          <Link href="https://github.com/KXzeno">Github</Link>
          <Link href="mailto:karnovah@outlook.com">Contact</Link>
          <Link href="https://discord.gg/5t77NmRYS8">Discord</Link>
        </div>
      </nav>
    </footer>
  );
}
