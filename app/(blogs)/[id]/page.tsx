import React from 'react';
import { Post } from '@/components';

export default function Blog({ params }: { params: { id: string }}): React.ReactNode {
  let id = params.id;
  return (
    <>
      <Post param={id}/>
    </>
  );
}
