import React from 'react';
import { notFound } from 'next/navigation';
import { getCategory } from '@A/PostActions';
import PostsInCategory from '@M/PostsInCategory';

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata(props: {
  params: Params,
  searchParams: SearchParams,
}) {
  let params = await props.params;
  let slug = params.slug;
}

export default async function Category(props: { params: Params, searchParams: SearchParams }): Promise<React.ReactNode> {
  let params = await props.params;
  let slug = params.slug;
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

