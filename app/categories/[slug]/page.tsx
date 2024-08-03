import React from 'react';
import { notFound } from 'next/navigation';
import { getByCategory } from '@A/PostActions/readPostAll';

export default async function Category({ params }: { params: { slug: string }}): Promise<React.ReactNode> {
  let slug = params.slug.toLowerCase();
  let cat = await getByCategory(slug);
  if (cat === null) {
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
      {slug}
    </React.Suspense>
  );
}

