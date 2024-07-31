'use client';
import React from 'react';
import './Feed.css';
import { readPostAll, getInitialId } from '@A/PostActions';
import Link from 'next/link';
import useOnscreen from '@H/useOnscreen';
import { useSearchParams } from 'next/navigation';
import FilteredFeed from './FilteredFeed';

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
      return { 
        terminus: true,
        ...state
      };
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
  interface QueryParams {
    orderBy?: {
      [key: PropertyKey]: object | string | number;
    }
    where?: {
      choice: {
        not: number
      }
    }
    cursor?: number;
  }

  let searchParams = useSearchParams();
  let choiceSelected = searchParams.get('choice');
  let choice: boolean = false;
  let queryParams: QueryParams = {
    orderBy: {
      createdAt: 'desc',
    }
  }

  if (choiceSelected && Number.parseInt(choiceSelected) === 1) {
    choice = true;
    queryParams = { ...queryParams, where: { choice: { not: 4 } } }
    initialData = initialData.filter((post) => {
      if (post.choice !== null && (post.choice > 0 && post.choice < 4)) {
        return post;
      }
    });
    initialCursor = initialData[initialData.length - 1].post_id;
  }

  let [state, dispatch] = React.useReducer(reducer, { 
    posts: [...initialData],
    cursor: initialCursor,
    queryParams: queryParams 
  });

  let termRef = React.useRef<HTMLElement | null>(null);
  let isVisible = useOnscreen(termRef, state.posts);

  async function getPosts(cursor: number) {
    // Safety check to avoid query on unexpected renders
    if (state.terminus === true) {
      return;
    }

    let newData = await readPostAll({
      ...state.queryParams,
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
        choice: choice,
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
    if (state.posts.length === 0) {
      try {
        +(async () => {
          await getPosts(state.cursor);
        })();
      } catch (x) {
        console.error(x);
      }
    }

    // Cursor pagination (Default)
    if (isVisible && state.posts.length > 0) {
      try {
        +(async () => {
          await getPosts(state.cursor);
        })();
      } catch (x) {
        console.error(x);
      }
    }
  }, [isVisible, state.terminus]);

  let compiledRFC = React.useMemo(() => {
    return (
      <main className='home-page'>
        {state.posts.map((post: any, index: number) => {
          if (index === state.posts.length - 1) {
            return (
              <section ref={termRef} className={`post-ctr ${post.choice < 4 ? `choice-${post.choice}` : ''}`} key={post.title}>
                <Link href={`/${post.title}`}>
                  <h1 className='post-title'>{post.title}</h1>
                </Link>
                <p className='post-desc'>{post.description}</p>
                <time className='post-date'>{post.createdAt.toISOString().split(/T/)[0]}</time>
              </section>
            );
          } else {
            return (
              <section className={`post-ctr${post.choice < 4 ? ` choice-${post.choice}` : ''}`} key={post.title}>
                <span className='section-sym hidden'>§</span>
                <Link href={`/${post.title}`}
                  onPointerOver={(e) => {
                    let elem = e.target as HTMLElement;
                    if (!elem) return;
                    let parentElem = elem.parentElement as HTMLAnchorElement;
                    if (!parentElem) return;
                    let target = parentElem.previousElementSibling;
                    if (!target) return;
                    target.classList.toggle('hidden');
                  }}
                  onPointerOut={(e) => {
                    let elem = e.target as HTMLElement;
                    if (!elem) return;
                    let parentElem = elem.parentElement as HTMLAnchorElement;
                    if (!parentElem) return;
                    let target = parentElem.previousElementSibling;
                    if (!target) return;
                    target.classList.toggle('hidden');
                  }}
                >
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
