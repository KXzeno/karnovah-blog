import React from 'react';
import { Post } from '@/components';

export default async function Blog({ params }: { params: Promise<{ id: string }> }): Promise<React.ReactNode> {
  let id = params.then(res => res.id);
  if (typeof id === "string") {
    return (
      <>
        <Post param={id}/>
      </>
    );
  }
}
