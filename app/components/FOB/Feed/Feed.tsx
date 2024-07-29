'use client';
import React from 'react';
import './Feed.css';
import { readPostAll, getInitialId } from '@A/PostActions';
import useOnscreen from '@H/useOnscreen';

/** @deprecated
 * @param {string} filePath - path, relative to root, to json
 * @returns {object | undefined} parsed JSON on fulfilled, null on reject
 * @author Kx
 */
async function getFile(filePath: string): Promise<object | null> {
  try {
    let data = await readFile(`./app/${filePath}`, { encoding: 'utf8' });
    let content = JSON.parse(data)
    return content;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// TODO: Filter on query to avoid unnecessary fields

interface Post {
  post_id: number;
  title: string;
  createdAt: Date;
  published: boolean;
  subtitle: string;
  description: string;
  choice: number | null;
}

export default function Feed() {
  let [data, setData] = React.useState<Post[]>([]);
  let [cursor, setCursor] = React.useState<number | undefined>(undefined);

  let termRef = React.useRef<HTMLElement | null>(null);
  let isVisible = useOnscreen(termRef, data);

  let loadPosts = async () => {
    if (cursor === undefined) {
      try {
        let initialId = await getInitialId();
        if (initialId !== undefined) {
          setCursor(initialId - 1);
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
        setData((prevData) => [...prevData, ...newData]);
        setCursor(newData[newData.length - 1].post_id);
      }
    } catch (x) {
      console.error(x);
    }
  }

  React.useEffect(() => {
    if (!(data.length > 0)) {
      loadPosts();
    }

  }, []);

  React.useEffect(() => {
    if (isVisible) {
      loadPosts();
    }
  }, [isVisible]);

  return (
    <>
      <main className='home-page'>
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
      </main>
    </>
  );
}
