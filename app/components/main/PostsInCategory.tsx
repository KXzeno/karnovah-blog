import React from 'react';
import Link from 'next/link';

export default function PostsInCategory({ category }: { category: unknown }) {
  // @ts-expect-error
  let posts = category.posts;

  return (
    <main className='cat-wrapper'>
      <section>
        <ul>
        {/* @ts-expect-error */
          posts.reverse().map(post => {
            let title = post.title;
            let date = post.createdAt.toISOString().split('T')[0];
            let targetRoute = title.toLowerCase().split(/[\s\:]/).join('-');
            return (
              <li key={title}>
                <time>{`${date}`}</time>
                <span>—</span>
                <Link href={`/${targetRoute}`}>{`${title}`}</Link>
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
