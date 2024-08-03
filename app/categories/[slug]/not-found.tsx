'use client';
import Link from 'next/link'
import { createPortal } from 'react-dom'
 
export default function NotFound() {
  return (
    <>
      {/* creating a portal in "server" component won't be able to detect document */}
      {createPortal(
        <div className='flex flex-col items-center justify-center absolute min-h-screen bg-black z-10 w-screen'>
          <h2>Not Found</h2>
          <p>Could not find requested resource</p>
          <Link href="/">Return Home</Link>
        </div>, document.body)}
    </>
  )
}
