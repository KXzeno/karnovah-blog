import React from 'react';
import { Post } from '@/components';
import './not-found';
import { notFound } from 'next/navigation';

type PageProps = Promise<{ id: string }>;

export default async function Blog(params: PageProps): Promise<React.ReactNode> {
  let { id } = await params;
  if (typeof id === "string") {
    return (
      <>
        <Post param={id}/>
      </>
    );
  } else {
    notFound();
  }
}
