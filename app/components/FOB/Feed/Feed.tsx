'use client';
import React from 'react';
import './Feed.css';
import { readPostAll, getInitialId } from '@A/PostActions';
import Link from 'next/link';
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

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'posts': {
      // if (!action.payload.posts) {
      //   throw new Error('No payload parsed.');
      // }
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        cursor: state.posts[state.posts.length - 1].post_id,
      }
    }
    // Individual cursor setting
    case 'cursor': {
      if (!state || !state.posts || state.posts.length <= 0) throw new Error('No initial ID found.');
      return {
        cursor: state.posts[state.posts.length - 1].post_id,
      }
    }
    case 'terminus': {
      return { terminus: true };
    }
  }
}
interface Post {
  post_id: number;
  title: string;
  createdAt: Date;
  published: boolean;
  subtitle: string;
  description: string;
  choice: number | null;
}

interface FeedProps {
  initialData: Post[];
  initialCursor: number;
}

export default React.memo(function Feed({ initialData, initialCursor }: FeedProps) {
  let [state, dispatch] = React.useReducer(reducer, { posts: [...initialData], cursor: initialCursor });

  let termRef = React.useRef<HTMLElement | null>(null);
  let isVisible = useOnscreen(termRef, state && state.posts);

  async function getPosts(cursor: number) {
    let newData = await readPostAll({
      field: 'createdAt',
      value: 'desc',
      cursor: cursor,
    });

    if (typeof newData === 'undefined') {
      return;
      // throw new Error('No posts parsed.');
    }

    let [{ posts }, postsLeaf, newDataLeaf] = [state, state.posts.length - 1, newData.length - 1];

    if ((posts[postsLeaf].post_id === newData[newDataLeaf].post_id)) {
      // Unable to reset ref in this function, delegate to useEffect
      dispatch({ type: 'terminus' });
      return;
      // throw new Error('No posts left.');
    }

    dispatch({ 
      type: 'posts',
      payload: {
        posts: newData,
      }
    });
  }

  React.useEffect(() => {
    // If reached end of posts, pause query by ref termination (delegated by getPosts)
    if (state.terminus === true) {
      termRef.current = null;
      // Cannot return statements (void expressions) in effect, but terminates on 'never' type
      return;
    }

    // If server side rendering failed, load on client
    if (state && state.posts && state.posts.length === 0) {
      getPosts(state.cursor);
    }

    // Cursor pagination
    if (isVisible && state && state.posts && state.posts.length > 0) {
      getPosts(state.cursor);
    }
  }, [isVisible, state.terminus]);

  let compiledRFC = React.useMemo(() => {
    return (
      <main className='home-page'>
        <button type="button" onClick={() => console.log(state.posts)}>Test</button>
        {state && state.posts && state.posts.map((post: any, index: number) => {
          if (index === state.posts.length - 1) {
            return (
              <section ref={termRef} className='post-ctr' key={post.title}>
                <Link href={`/${post.title}`}>
                  <h1 className='post-title'>{post.title}</h1>
                </Link>
                <p className='post-desc'>{post.description}</p>
                <time className='post-date'>{post.createdAt.toISOString().split(/T/)[0]}</time>
              </section>
            );
          } else {
            return (
              <section className='post-ctr' key={post.title}>
                <Link href={`/${post.title}`}>
                  <h1 className='post-title'>{post.title}</h1>
                </Link>
                <p className='post-desc'>{post.description}</p>
                <time className='post-date'>{post.createdAt.toISOString().split(/T/)[0]}</time>
              </section>
            );
          }
        })}
      </main>)
  }, [state]);

  return (
    <>
      {compiledRFC}
    </>
  )});
