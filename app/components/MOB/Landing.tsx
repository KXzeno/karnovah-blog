import React from 'react';
import { unstable_cache } from 'next/cache';

import { readPostAll } from '@A/PostActions';
import Feed from '@F/Feed';

// FOR INITIAL DATA, STOP GETTING CONFUSED FROM COMBINING PAGINATION.
// DO PAGINATION ASYNCHRONOUSLY IN CLIENT COMPONENT

// FIXME: Add auto update on altered / added data
// Seems to only update if the site is republished
// Robust fix: compare updated date and creation date

/** @remarks
 * Unstable cache will be "use cache" in the future
 *
 * Stringify's ISO Dates, thus additional safeguards for 
 * type mapping logic should be handled from the Feed RFC
 */
let getCachedPosts = unstable_cache(
  async () => {
    return await readPostAll({ orderBy: { createdAt: 'desc' } });
  }, ['posts'], { tags: ['posts'], revalidate: false });

  export default async function Landing() {
    // let initialData: Post[] | null = await readPostAll({ orderBy: { createdAt: 'desc' } }) ?? null;
    let initialData = await getCachedPosts() ?? null;
    let initialCursor: number | null = null;
    // revalidatePath('/');
    if (!initialData || initialData.length <= 0) {
      initialCursor = null;
      initialData = [{
        post_id: 0,
        title: 'Zero Query',
        createdAt: new Date(),
        published: true,
        subtitle: 'No posts have queried',
        description: 'If you see this, either there are no posts to be queried from the database or none of them are marked published.',
        choice: 2 
      }] as NonNullable<Awaited<ReturnType<typeof readPostAll>>>;
      console.log('Query for posts failed.');
    } else {
      initialCursor = initialData[initialData.length - 1].post_id;
    }


    return (
      initialCursor && initialData ?
        <>
          <React.Suspense>
            <Feed initialData={initialData} initialCursor={initialCursor}/>
          </React.Suspense>
        </> :
        <>
          <React.Suspense>
            <Feed initialData={initialData} initialCursor={0} />
          </React.Suspense>
        </>
    )
  }
