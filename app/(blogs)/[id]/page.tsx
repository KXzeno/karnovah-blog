import React from 'react';
import { Post } from '@/components';

export default function Blog({ params }: { params: { id: string }}): React.ReactNode {
  let id = params.id.toLowerCase();
  return (
    <>
      <Post param={id}/>
    </>
  );
}
