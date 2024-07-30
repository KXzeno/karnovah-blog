'use client';
import React from 'react';
import './Feed.css';
import { readPostAll, getInitialId } from '@A/PostActions';
import useOnscreen from '@H/useOnscreen';

interface Post {
  post_id: number;
  title: string;
  createdAt: Date;
  published: boolean;
  subtitle: string;
  description: string;
  choice: number | null;
}

interface StateDefaults {
  dispatchData: React.Dispatch<React.SetStateAction<Post[]>>;
  cursor: number | undefined;
  dispatchCursor: React.Dispatch<React.SetStateAction<number | undefined>>;
}

async function getPosts({
  dispatchData,
  cursor,
  dispatchCursor, 
}: StateDefaults) {
  if (cursor === undefined) {
    try {
      let initialId = await getInitialId();
      if (initialId !== undefined) {
        dispatchCursor(initialId - 1);
      }
    } catch (x) {
      console.error(`Unable to find initial post. ${x}`);
    }
  }
  try {
    let newData = await readPostAll({
      field: 'createdAt',
      value: 'desc',
      cursor: cursor,
    });

    if (newData && newData.length > 0) {
      dispatchData((prevData) => [...prevData, ...newData]);
      dispatchCursor(newData[newData.length - 1].post_id);
    }
  } catch (x) {
    console.error(x);
  }
}

export default React.memo(function Feed() {
  let [data, setData] = React.useState<Post[]>([]);
  let [cursor, setCursor] = React.useState<number | undefined>(undefined);

  let termRef = React.useRef<HTMLElement | null>(null);
  let isVisible = useOnscreen(termRef, data);

  let loadPosts = React.useCallback(() => {
    getPosts({ cursor, dispatchData: setData, dispatchCursor: setCursor })
  }, [data, cursor]);

  React.useEffect(() => {
    if (!(data.length > 0)) {
      loadPosts();
    }
    if (isVisible) {
      loadPosts();
    }
  }, [isVisible]);

  let compiledRFC = React.useMemo(() => {
    return (<main className='home-page'>
      {data && data.map((post: any, index: number) => {
        if (index === data.length - 1) {
          return (
            <section ref={termRef} className='post-ctr' key={post.title}>
              <h1 className='post-title'>{post.title}</h1>
              <p className='post-desc'>{post.description}</p>
              <time className='post-date'>{post.createdAt.toISOString().split(/T/)[0]}</time>
            </section>
          );
        } else {
          return (
            <section className='post-ctr' key={post.title}>
              <h1 className='post-title'>{post.title}</h1>
              <p className='post-desc'>{post.description}</p>
              <time className='post-date'>{post.createdAt.toISOString().split(/T/)[0]}</time>
            </section>
          );
        }
      })}
    </main>)
  }, [data]);

  return (
    <>
      {compiledRFC}
    </>
  );
});
