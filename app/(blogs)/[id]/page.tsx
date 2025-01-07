import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';

import { Post } from '@/components';
import { readPost } from '@A/PostActions';
import './not-found';

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

let data: Awaited<ReturnType<typeof readPost>>;

export async function generateMetadata(props: {
  params: Params,
  searchParams: SearchParams,
}) {
  let params = await props.params;
  let id = params.id;

  // Is it odd that data is queried during metadata 
  // definition instead of the dynamic route?
  let postData = await readPost(id);
  data = postData;

  return {
    title: `${postData ? postData.title : ''}`,
    openGraph: {
      title: `${postData ? postData.title : ''}`,
      description: `${postData ? postData.description : ''}`
    }
  }
};

export default async function Blog(props: { params: Params, searchParams: SearchParams }): Promise<React.ReactNode> {
  // let { id } = await props.params;
  return (
    <>
      <Post post={data} />
    </>
  );
} 
