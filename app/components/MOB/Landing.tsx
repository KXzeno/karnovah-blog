import React from 'react';
import { readPostAll, getInitialId } from '@A/PostActions';
import Feed from '@F/Feed';

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

export default async function Landing() {
  let initialData: Post[] | undefined = await readPostAll({ orderBy: { createdAt: 'desc' } });

  if (!initialData) {
    throw new Error('Query for posts failed.');
  }

  let initialCursor = initialData[initialData.length - 1].post_id;

  return (
    <>
      <Feed initialData={initialData} initialCursor={initialCursor}/>
    </>
  )
}
