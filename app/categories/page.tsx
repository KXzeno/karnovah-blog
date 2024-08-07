import React from 'react';
import { getByCategory } from '@A/PostActions/readPostAll';
import Link from 'next/link';
import './categories.css';

export default async function Page() {
  let categories = await getByCategory();

  return (
    <>
      <nav className='catalog'>
        <ul>
        {categories && categories.map(item => {
          return (
            <li key={item.name}>
              <Link href={`/categories/${item.name}`}>{`${item.name}`}</Link>
              <span>—</span>
              <span>{`${item.posts !== undefined ? item.posts.length : 0}`}</span>
            </li>
          )})
        }
        </ul>
      </nav>
    </>);
}
