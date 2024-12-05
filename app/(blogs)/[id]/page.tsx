import React from 'react';
import { Post } from '@/components';
import './not-found';

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export async function generateMetadata(props: {
  params: Params,
  searchParams: SearchParams,
}) {
  let params = await props.params;
  let id = params.id;
};

export default async function Blog(props: { params: Params, searchParams: SearchParams }): Promise<React.ReactNode> {
  let { id } = await props.params;
  return (
    <>
      <Post param={id}/>
    </>
  );
} 
