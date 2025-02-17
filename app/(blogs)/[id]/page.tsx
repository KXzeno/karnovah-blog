import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';

import { Post } from '@/components';
import { readPost } from '@A/PostActions';
import './not-found';
import { scheduler } from 'timers/promises';

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export async function generateMetadata(props: {
  params: Params,
  searchParams: SearchParams,
}) {
  let params = await props.params;
  let id = params.id;

  let postData = await readPost(id);

  return {
    title: `${postData ? postData.title : ''}`,
    openGraph: {
      title: `${postData ? postData.title : ''}`,
      description: `${postData ? postData.description : ''}`
    }
  }
};

export default async function Blog(props: { params: Params, searchParams: SearchParams }): Promise<React.ReactNode> {
  const { id } = await props.params;
  // TODO: Find out if this duplicates queries
  const data = await readPost(id)
  return (
    <React.Suspense>
      <Post post={data} />
    </React.Suspense>
  );
} 
