import React from 'react';
import { Post } from '@/components';

type PageProps = Promise<{ params: { id: string } }>;

export default async function Blog(pageProps: PageProps): Promise<React.ReactNode> {
  let id = pageProps.then(res => res.params.id);
  if (typeof id === "string") {
    return (
      <>
        <Post param={id}/>
      </>
    );
  }
}
