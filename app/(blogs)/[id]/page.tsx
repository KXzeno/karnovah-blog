import React from 'react';
import { Post } from '@/components';
import './not-found';

type Params = Promise<{ id: string }>;

export default async function Blog({ params }: { params: Params }): Promise<React.ReactNode> {
  let { id } = await params;
  return (
    <>
      <Post param={id}/>
    </>
  );
} 
