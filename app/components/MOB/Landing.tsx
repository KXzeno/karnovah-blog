import React from 'react';
import { readPostAll, getInitialId } from '@A/PostActions';
import Feed from '@F/Feed';
import { revalidatePath } from 'next/cache';

interface Post {
  post_id: number;
  title: string;
  createdAt: Date;
  published: boolean;
  subtitle: string;
  description: string;
  choice: number | null;
}

// FOR INITIAL DATA, STOP GETTING CONFUSED FROM COMBINING PAGINATION.
// DO PAGINATION ASYNCHRONOUSLY IN CLIENT COMPONENT

// FIXME: Add auto update on altered / added data
// Seems to only update if the site is republished
// Robust fix: compare updated date and creation date

export default async function Landing() {
  let initialData: Post[] | undefined = await readPostAll({ orderBy: { createdAt: 'desc' } });
  // revalidatePath('/');
  if (!initialData) {
    throw new Error('Query for posts failed.');
  }

  let initialCursor = initialData[initialData.length - 1].post_id;

  return (
    <>
      <React.Suspense>
        <Feed initialData={initialData} initialCursor={initialCursor}/>
      </React.Suspense>
    </>
  )
}
