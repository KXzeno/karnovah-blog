import React from 'react';
import { notFound } from 'next/navigation';
import { getCategory } from '@A/PostActions';
import PostsInCategory from '@M/PostsInCategory';

type Params = Promise<{ slug: string }>;

export default async function Category({ params }: { params: Params }): Promise<React.ReactNode> {
  let { slug } = await params;
  if (typeof slug === "string") {
    let cat = await getCategory(slug);
    if (cat === null || cat === undefined) {
      // No need for return keyword; returns a 'never' type
      return notFound();
    }

    /** @privateRemarks
     * Brief moments where cat returns null befores serve,
     *  wrapping the component with suspense, I determined, will use
     *  existing fallbacks, if not loading.tsx then not-found.tsx. 
     */
    return (
      <React.Suspense>
        <PostsInCategory category={cat} />
      </React.Suspense>
    );
  }
}

