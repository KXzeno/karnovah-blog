import React from 'react';
import { Post } from '@/components';
import './not-found';

type PageProps = Promise<{ id: string }>;

export default async function Blog(params: PageProps): Promise<React.ReactNode> {
  let { id } = await params;
  return (
    <>
      <Post param={id}/>
    </>
  );
} 
